/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { PhoneModel, ComponentPart, ViewMode, ComponentCategory } from '../types';
import { Phone3DAssembly } from './PhoneBuilder';

export interface GLBMappedPart {
  mesh: THREE.Object3D;
  basePos: THREE.Vector3;
  targetPos: THREE.Vector3;
  part: ComponentPart;
  originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]>;
}

export interface GLBLoadProgress {
  loaded: number;
  total: number;
  percent: number;
  stage: string;
}

export class PhoneGLBAssembly {
  public group: THREE.Group;
  public partsMap: Map<string, GLBMappedPart>;
  public model: PhoneModel;
  public gltfScene: THREE.Group | null = null;
  public currentExplodedFactor: number = 0;
  public currentViewMode: ViewMode = 'realistic';
  public outerShellMeshes: THREE.Mesh[] = [];
  public internalComponentMeshes: THREE.Mesh[] = [];

  // Rich code-generated internal components active inside the hollow cavity of the GLB shell
  public proceduralInternals: Phone3DAssembly;

  private geometriesToDispose: THREE.BufferGeometry[] = [];
  private materialsToDispose: THREE.Material[] = [];
  private texturesToDispose: THREE.Texture[] = [];

  constructor(model: PhoneModel) {
    this.model = model;
    this.group = new THREE.Group();
    this.group.name = `PhoneGLBAssembly_${model.id}`;
    this.partsMap = new Map();

    // 1. Instantiate code-generated internal components (battery, processor chip, logic board, cooling chamber, etc.)
    // These remain active and are positioned precisely inside the hollow cavity of the GLB shell.
    this.proceduralInternals = new Phone3DAssembly(model, { internalsOnly: true });
    this.group.add(this.proceduralInternals.group);

    // Register all internal components into partsMap for raycasting, HUD, and dossier tracking
    this.proceduralInternals.partsMap.forEach((entry, key) => {
      this.partsMap.set(key, {
        mesh: entry.mesh,
        basePos: entry.basePos,
        targetPos: entry.targetPos,
        part: entry.part,
        originalMaterials: new Map()
      });
    });
  }

  /**
   * Load and parse a GLB/GLTF model from a URL or Object URL
   */
  public static loadGLB(
    url: string,
    model: PhoneModel,
    onProgress?: (progress: GLBLoadProgress) => void
  ): Promise<PhoneGLBAssembly> {
    return new Promise((resolve, reject) => {
      const assembly = new PhoneGLBAssembly(model);

      const gltfLoader = new GLTFLoader();

      // Configure Draco decoder for compressed GLB meshes
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
      gltfLoader.setDRACOLoader(dracoLoader);

      if (onProgress) {
        onProgress({
          loaded: 0,
          total: 100,
          percent: 5,
          stage: 'CONNECTING TO 3D ASSET STREAM...'
        });
      }

      gltfLoader.load(
        url,
        (gltf: GLTF) => {
          if (onProgress) {
            onProgress({
              loaded: 100,
              total: 100,
              percent: 90,
              stage: 'INITIALIZING HYBRID SHELL & POSITIONING INTERNALS...'
            });
          }

          try {
            assembly.initFromGLTF(gltf);
            dracoLoader.dispose();
            if (onProgress) {
              onProgress({
                loaded: 100,
                total: 100,
                percent: 100,
                stage: 'HYBRID TEARDOWN READY'
              });
            }
            resolve(assembly);
          } catch (err) {
            dracoLoader.dispose();
            reject(err);
          }
        },
        (event: ProgressEvent) => {
          if (onProgress && event.lengthComputable && event.total > 0) {
            const percent = Math.min(Math.round((event.loaded / event.total) * 85), 85);
            onProgress({
              loaded: event.loaded,
              total: event.total,
              percent,
              stage: `DOWNLOADING GLB BUFFER: ${(event.loaded / (1024 * 1024)).toFixed(1)}MB / ${(event.total / (1024 * 1024)).toFixed(1)}MB`
            });
          } else if (onProgress) {
            onProgress({
              loaded: event.loaded || 50,
              total: 100,
              percent: 50,
              stage: 'TRANSFERRING GLB BINARY...'
            });
          }
        },
        (error) => {
          dracoLoader.dispose();
          reject(error);
        }
      );
    });
  }

  /**
   * Process loaded GLTF hierarchy:
   * 1. Normalize scale and orientation to fit around the internal components.
   * 2. Use the imported GLB strictly for outer frame, chassis, and back glass.
   * 3. Position the GLB outer shell enclosing the code-generated internals.
   * 4. Configure outer shell transparency and setup synchronized disassembly vectors.
   */
  private initFromGLTF(gltf: GLTF) {
    this.gltfScene = gltf.scene;

    // 1. Calculate bounding box of the raw imported model
    const initialBox = new THREE.Box3().setFromObject(this.gltfScene);
    const initialSize = initialBox.getSize(new THREE.Vector3());
    const initialCenter = initialBox.getCenter(new THREE.Vector3());

    // Orientation safeguard:
    // If model was exported Z-up (from Blender/CAD) where Z is longest dimension, rotate -90 deg on X
    if (initialSize.z > initialSize.y && initialSize.z > initialSize.x) {
      this.gltfScene.rotation.x = -Math.PI / 2;
      this.gltfScene.updateMatrixWorld(true);
      initialBox.setFromObject(this.gltfScene);
      initialBox.getSize(initialSize);
      initialBox.getCenter(initialCenter);
    }
    // If model was exported in landscape where X is longest dimension, rotate 90 deg on Z
    if (initialSize.x > initialSize.y && initialSize.x > initialSize.z) {
      this.gltfScene.rotation.z = Math.PI / 2;
      this.gltfScene.updateMatrixWorld(true);
      initialBox.setFromObject(this.gltfScene);
      initialBox.getSize(initialSize);
      initialBox.getCenter(initialCenter);
    }

    // 2. Normalize scale: match the height of the phone model chassis (~7.3 units)
    // so the GLB shell wraps with exact precision around the code-generated internal components
    const chassisComp = this.model.components.find((c) => c.category === 'chassis');
    const targetHeight = chassisComp ? chassisComp.dimensions[1] : 7.3;

    const maxDim = Math.max(initialSize.x, initialSize.y, initialSize.z);
    let scaleFactor = 1.0;
    if (initialSize.y > 0.001) {
      scaleFactor = targetHeight / initialSize.y;
    } else if (maxDim > 0.001) {
      scaleFactor = targetHeight / maxDim;
    }

    this.gltfScene.scale.setScalar(scaleFactor);

    // 3. Center model at origin (0, 0, 0)
    this.gltfScene.position.set(
      -initialCenter.x * scaleFactor,
      -initialCenter.y * scaleFactor,
      -initialCenter.z * scaleFactor
    );

    // Create wrapper root group for GLTF
    const normalizedRoot = new THREE.Group();
    normalizedRoot.name = 'GLB_NormalizedRoot';
    normalizedRoot.add(this.gltfScene);
    normalizedRoot.updateMatrixWorld(true);

    // 4. Traverse and classify meshes:
    // Use imported GLB strictly for outer frame, chassis, front glass, and back glass.
    this.outerShellMeshes = [];
    this.internalComponentMeshes = [];

    const displayPart = this.model.components.find((c) => c.category === 'display') || this.model.components[0];
    const chassisPart = this.model.components.find((c) => c.category === 'chassis') || this.model.components[0];
    const backGlassPart = this.model.components.find((c) => c.meshType === 'back_glass') || this.model.components[0];

    // Groups for exterior shell parts
    const displayShellGroup = new THREE.Group();
    displayShellGroup.name = `GLB_Shell_${displayPart.id}`;

    const chassisShellGroup = new THREE.Group();
    chassisShellGroup.name = `GLB_Shell_${chassisPart.id}`;

    const backGlassShellGroup = new THREE.Group();
    backGlassShellGroup.name = `GLB_Shell_${backGlassPart.id}`;

    this.gltfScene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Clone material to avoid shared GLTF material index bleeding
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else {
          mesh.material = mesh.material.clone();
        }
      }

      const { isOuterShell, shellType } = this.classifyOuterVsInternal(mesh);

      if (isOuterShell) {
        // Outer shell part (frame, chassis, front glass, back glass)
        mesh.visible = true;
        mesh.userData.isOuterShell = true;
        mesh.userData.shellType = shellType;
        mesh.renderOrder = 2; // Render translucent shell over opaque internals
        this.outerShellMeshes.push(mesh);

        // Store original position for explosion translation
        mesh.userData.origPos = mesh.position.clone();

        // Assign appropriate component part and exploded translation vector:
        // In the phone's coordinate space:
        // -Z is front (display), +Z is rear (back glass)
        if (shellType === 'front_glass') {
          mesh.userData.componentId = displayPart.id;
          mesh.userData.partData = displayPart;
          mesh.userData.explodedOffset = new THREE.Vector3(0, 0, -7.6);
        } else if (shellType === 'back_cover' || shellType === 'rear_glass') {
          mesh.userData.componentId = backGlassPart.id;
          mesh.userData.partData = backGlassPart;
          mesh.userData.explodedOffset = new THREE.Vector3(0, 0, 11.4);
        } else {
          // Chassis frame / midframe
          mesh.userData.componentId = chassisPart.id;
          mesh.userData.partData = chassisPart;
          mesh.userData.explodedOffset = new THREE.Vector3(0, 0, -4.2);
        }

        // Apply transparent glass material properties to outer shell meshes:
        // Faint translucent outline when assembled, revealing rich code-generated internal components inside!
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const stdMat = mat as THREE.MeshStandardMaterial;
          if (stdMat.isMeshStandardMaterial || (stdMat as any).isMeshPhysicalMaterial) {
            stdMat.transparent = true;
            stdMat.opacity = 0.3; // Faint outline of casing
            stdMat.depthWrite = false; // Internal components remain fully visible through shell
            stdMat.roughness = 0.2;
            stdMat.metalness = 0.15;
            stdMat.envMapIntensity = 1.2;
            stdMat.needsUpdate = true;
          }
        });
      } else {
        // Any non-shell / internal mesh from the imported GLB:
        // Hide it so it doesn't obstruct or collide with the detailed code-generated internals
        mesh.visible = false;
        mesh.userData.isOuterShell = false;
        mesh.userData.isInternal = true;
      }
    });

    // 5. Register GLB exterior parts into partsMap
    this.partsMap.set(displayPart.id, {
      mesh: displayShellGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      targetPos: new THREE.Vector3(0, 0, -7.6),
      part: displayPart,
      originalMaterials: new Map()
    });

    this.partsMap.set(chassisPart.id, {
      mesh: chassisShellGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      targetPos: new THREE.Vector3(0, 0, -4.2),
      part: chassisPart,
      originalMaterials: new Map()
    });

    this.partsMap.set(backGlassPart.id, {
      mesh: backGlassShellGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      targetPos: new THREE.Vector3(0, 0, 11.4),
      part: backGlassPart,
      originalMaterials: new Map()
    });

    this.group.add(normalizedRoot);
  }

  /**
   * Determine if a mesh corresponds to the outer shell:
   * "Back Cover", "Rear Glass", "Main Chassis Frame", or front cover glass
   * vs an internal component (Battery, Logic Board, Chips, Camera, Taptic Engine, etc.)
   */
  public classifyOuterVsInternal(mesh: THREE.Mesh): {
    isOuterShell: boolean;
    shellType?: 'back_cover' | 'rear_glass' | 'chassis_frame' | 'front_glass';
  } {
    const nodeName = `${mesh.name} ${mesh.parent?.name || ''}`.toLowerCase();

    // Check material names if any
    let matNames = '';
    if (mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      matNames = mats.map((m) => m.name || '').join(' ').toLowerCase();
    }
    const combinedIdentifiers = `${nodeName} ${matNames}`;

    // 1. HARD GUARD: Internal hardware components MUST NEVER be treated as outer shell
    const internalRegex = /(battery|cell|accu|li-ion|lipo|pack|motherboard|mainboard|logic|pcb|board|substrate|processor|cpu|soc|bionic|snapdragon|tensor|chipset|npu|gpu|die|wafer|camera|cam|lens|optics|telephoto|ultrawide|periscope|flash|sensor_cam|taptic|motor|vibrat|actuator|speaker|audio|sound|mic|heatsink|vapor|heatpipe|copper|thermal|spreader|graphite|modem|antenna|5g|wifi|bluetooth|rf|transceiver|sensors|coil|induction|qi|nfc|fingerprint|lidar|connector|ribbon|flex|ram|memory|storage|ufs|nand)/i;

    if (internalRegex.test(combinedIdentifiers)) {
      return { isOuterShell: false };
    }

    // 2. Identify Back Cover
    const backCoverRegex = /(back.*cover|rear.*cover|back.*panel|rear.*panel|back_cover|rear_cover|cover_back|case_back|back_case|rear_case|back_housing|rear_housing|backcover|rearcover|backplate)/i;
    if (backCoverRegex.test(combinedIdentifiers)) {
      return { isOuterShell: true, shellType: 'back_cover' };
    }

    // 3. Identify Rear Glass
    const rearGlassRegex = /(rear.*glass|back.*glass|glass.*rear|glass.*back|rear_glass|back_glass|rearglass|backglass)/i;
    if (rearGlassRegex.test(combinedIdentifiers)) {
      return { isOuterShell: true, shellType: 'rear_glass' };
    }

    // 4. Identify Main Chassis Frame
    const chassisFrameRegex = /(main.*chassis|chassis.*frame|chassis|midframe|middle.*frame|metal.*frame|outer.*frame|body.*frame|frame|housing|bezel|casing|enclosure|sides|rim|band|perimeter)/i;
    if (chassisFrameRegex.test(combinedIdentifiers)) {
      return { isOuterShell: true, shellType: 'chassis_frame' };
    }

    // 5. Identify Front Cover Glass / Screen
    const frontGlassRegex = /(front.*glass|cover.*glass|screen.*glass|display.*glass|glass.*front|front_glass|cover_glass|gorilla|display|screen)/i;
    if (frontGlassRegex.test(combinedIdentifiers)) {
      return { isOuterShell: true, shellType: 'front_glass' };
    }

    // 6. Spatial fallback: if node and material names are generic
    const bbox = new THREE.Box3().setFromObject(mesh);
    const center = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());

    // Front-most thin layer
    if (center.z > 0.12 && size.z < 0.3) {
      return { isOuterShell: true, shellType: 'front_glass' };
    }
    // Rear-most thin layer
    if (center.z < -0.12 && size.z < 0.35) {
      return { isOuterShell: true, shellType: 'rear_glass' };
    }
    // Outer perimeter band
    if (Math.abs(center.x) > 1.5 || Math.abs(center.y) > 3.2) {
      return { isOuterShell: true, shellType: 'chassis_frame' };
    }

    // Default to outer shell frame for any exterior surface
    return { isOuterShell: true, shellType: 'chassis_frame' };
  }

  /**
   * Set exploded factor (0 = fully assembled, 1 = fully expanded)
   * Synchronized Disassembly:
   * 1. Code-generated internal components (battery, processor chip, logic board, and cooling chamber)
   *    slide outward into their distinct layers in the center.
   * 2. Imported GLB outer shell parts slide outward (front glass to -7.6, chassis to -4.2, back glass to 11.4).
   * 3. Shell transparency is preserved so the teardown remains clearly visible.
   */
  public setExplodedFactor(factor: number) {
    this.currentExplodedFactor = factor;

    // 1. Animate code-generated internals in the center
    this.proceduralInternals.setExplodedFactor(factor);

    // 2. Animate GLB outer shell parts outward along distinct Z axes
    this.outerShellMeshes.forEach((mesh) => {
      if (!mesh.userData.origPos) {
        mesh.userData.origPos = mesh.position.clone();
      }
      const targetOffset = mesh.userData.explodedOffset || new THREE.Vector3(0, 0, 0);
      const currentOffset = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(0, 0, 0),
        targetOffset,
        factor
      );
      mesh.position.copy(mesh.userData.origPos).add(currentOffset);

      // In realistic view mode, maintain transparent outer shell
      // (0.3 when assembled, 0.45 when disassembled)
      if (this.currentViewMode === 'realistic' && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const stdMat = mat as THREE.MeshStandardMaterial;
          if (stdMat.isMeshStandardMaterial || (stdMat as any).isMeshPhysicalMaterial) {
            stdMat.transparent = true;
            stdMat.opacity = THREE.MathUtils.lerp(0.3, 0.45, Math.min(factor, 1.0));
            stdMat.depthWrite = false;
          }
        });
      }
    });
  }

  /**
   * Highlight a selected or hovered component with emissive glow
   */
  public highlightComponent(componentId: string | null) {
    // 1. Highlight internal components
    this.proceduralInternals.highlightComponent(componentId);

    // 2. Highlight GLB outer shell mesh if selected
    this.outerShellMeshes.forEach((mesh) => {
      if (mesh.material && mesh.userData) {
        const isTarget = mesh.userData.componentId === componentId;
        const part = mesh.userData.partData as ComponentPart | undefined;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        mats.forEach((mat) => {
          const stdMat = mat as THREE.MeshStandardMaterial;
          if (stdMat.isMeshStandardMaterial && stdMat.emissive) {
            if (isTarget && part) {
              stdMat.emissive.set(new THREE.Color(part.highlightColor));
              stdMat.emissiveIntensity = 0.45;
            } else if (this.currentViewMode === 'realistic') {
              stdMat.emissive.set(0x000000);
              stdMat.emissiveIntensity = 0;
            }
          }
        });
      }
    });
  }

  /**
   * Apply visual view modes: Realistic, Wireframe, X-Ray, and Thermal
   */
  public applyViewMode(mode: ViewMode) {
    this.currentViewMode = mode;

    // 1. Apply view mode to code-generated internal components
    this.proceduralInternals.applyViewMode(mode);

    // 2. Apply view mode to GLB outer shell meshes
    this.outerShellMeshes.forEach((mesh) => {
      if (mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const stdMat = mat as THREE.MeshStandardMaterial;
          if (!stdMat.isMeshStandardMaterial && !(stdMat as any).isMeshPhysicalMaterial) return;

          switch (mode) {
            case 'wireframe':
              stdMat.wireframe = true;
              stdMat.transparent = false;
              stdMat.opacity = 1.0;
              break;

            case 'xray':
              stdMat.wireframe = false;
              stdMat.transparent = true;
              stdMat.opacity = 0.18;
              stdMat.depthWrite = false;
              stdMat.emissive.set('#00e5ff');
              stdMat.emissiveIntensity = 0.08;
              break;

            case 'thermal':
              stdMat.wireframe = false;
              stdMat.transparent = true;
              stdMat.opacity = 0.22;
              stdMat.depthWrite = false;
              stdMat.color.set('#0369a1');
              stdMat.emissive.set('#0284c7');
              stdMat.emissiveIntensity = 0.06;
              break;

            case 'realistic':
            default:
              stdMat.wireframe = false;
              stdMat.transparent = true;
              stdMat.opacity = THREE.MathUtils.lerp(0.3, 0.45, Math.min(this.currentExplodedFactor, 1.0));
              stdMat.depthWrite = false;
              stdMat.roughness = 0.2;
              stdMat.metalness = 0.15;
              stdMat.emissive.set(0x000000);
              stdMat.emissiveIntensity = 0;
              break;
          }
        });
      }
    });
  }

  /**
   * Real-time thermal pulse simulation on internal components
   */
  public updateThermalPulse(time: number) {
    if (this.currentViewMode !== 'thermal') return;
    this.proceduralInternals.updateThermalPulse(time);
  }

  /**
   * Clean memory
   */
  public dispose() {
    this.proceduralInternals.dispose();

    if (this.gltfScene) {
      this.gltfScene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => m.dispose());
          }
        }
      });
    }
    this.geometriesToDispose.forEach((g) => g.dispose());
    this.materialsToDispose.forEach((m) => m.dispose());
    this.texturesToDispose.forEach((t) => t.dispose());
  }
}

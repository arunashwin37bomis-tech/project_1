/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PhoneModel, ComponentPart, ViewMode, ThemeMode } from '../types';
import { Phone3DAssembly } from './PhoneBuilder';
import { PhoneGLBAssembly, GLBLoadProgress } from './PhoneGLBAssembly';
import { GLBLoaderHUD } from './GLBLoaderHUD';
import { soundManager } from '../utils/audio';
import { Upload } from 'lucide-react';

interface ThreeViewportProps {
  model: PhoneModel;
  selectedComponent: ComponentPart | null;
  onSelectComponent: (component: ComponentPart | null) => void;
  hoveredComponent: ComponentPart | null;
  onHoverComponent: (component: ComponentPart | null) => void;
  explodedProgress: number; // 0 to 1
  onExplodedChange?: (progress: number) => void;
  viewMode: ViewMode;
  theme: ThemeMode;
  autoRotate: boolean;
  onResetCameraTrigger?: number;
  customGlbFile?: File | null;
  customGlbUrl?: string | null;
  onGlbLoaded?: (info: { fileName: string; isGLB: boolean; componentCount: number }) => void;
  onDropGlbFile?: (file: File) => void;
}

export const ThreeViewport: React.FC<ThreeViewportProps> = ({
  model,
  selectedComponent,
  onSelectComponent,
  hoveredComponent,
  onHoverComponent,
  explodedProgress,
  onExplodedChange,
  viewMode,
  theme,
  autoRotate,
  onResetCameraTrigger = 0,
  customGlbFile = null,
  customGlbUrl = null,
  onGlbLoaded,
  onDropGlbFile
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const assemblyRef = useRef<Phone3DAssembly | PhoneGLBAssembly | null>(null);
  const internalPointLightRef = useRef<THREE.PointLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Smooth camera animation targets
  const targetCamPos = useRef(new THREE.Vector3(6.5, 4, 15.5));
  const targetCamLook = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioningCam = useRef(false);

  // Current interpolated exploded progress & target position factor
  const currentExplodedRef = useRef(explodedProgress);
  const targetExplodedRef = useRef(explodedProgress);
  const currentViewModeRef = useRef(viewMode);

  // State Tracking: isDisassembled toggles cleanly back and forth
  const [isDisassembled, setIsDisassembled] = useState<boolean>(explodedProgress >= 0.5);
  const isDisassembledRef = useRef<boolean>(explodedProgress >= 0.5);

  // GLB Loading States
  const [isGlbLoading, setIsGlbLoading] = useState<boolean>(false);
  const [glbLoadProgress, setGlbLoadProgress] = useState<GLBLoadProgress | null>(null);
  const [glbError, setGlbError] = useState<string | null>(null);
  const [isGlbActive, setIsGlbActive] = useState<boolean>(false);
  const [activeGlbName, setActiveGlbName] = useState<string>('');
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  // 2D Screen position coordinates for hover label HUD
  const [hoverScreenPos, setHoverScreenPos] = useState<{ x: number; y: number } | null>(null);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(theme === 'dark' ? '#05070d' : '#f8fafc');

    // 2. Camera - comfortably framed for expanded teardown view
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(6.5, 4, 15.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 35;
    controls.minDistance = 2.5;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // 5. Studio Lighting Setup
    // Bright AmbientLight to illuminate the entire scene evenly
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 2.2 : 2.4);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Key Light (Front-Top-Right) - primary crisp directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    // Fill Light (Front-Bottom-Left) - softens harsh shadows, keeps metallic edges visible
    const fillLight = new THREE.DirectionalLight(0xf8fafc, 1.8);
    fillLight.position.set(-10, -5, 10);
    scene.add(fillLight);

    // Back Rim Light 1 (Rear-Top-Left) - highlights metallic bevels and sapphire lens edges
    const backRimLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    backRimLight1.position.set(-12, 12, -12);
    scene.add(backRimLight1);

    // Back Rim Light 2 (Rear-Bottom-Right) - illuminates back glass panel and periscope camera cluster
    const backRimLight2 = new THREE.DirectionalLight(0xe0f2fe, 1.8);
    backRimLight2.position.set(10, -8, -12);
    scene.add(backRimLight2);

    // Top Overhead Studio Softbox Light - creates realistic top studio highlights
    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(0, 16, 2);
    scene.add(topLight);

    // Bottom Floor Bounce Light - prevents deep black underside shadowing
    const bottomBounceLight = new THREE.DirectionalLight(0x94a3b8, 1.0);
    bottomBounceLight.position.set(0, -14, 0);
    scene.add(bottomBounceLight);

    // Internal Chassis Core Point Light - highlights internal chips, vapor chamber & coils when expanded
    const internalPointLight = new THREE.PointLight(0x00f0ff, 3.2, 18, 1.4);
    internalPointLight.position.set(0, 0.2, 0);
    scene.add(internalPointLight);
    internalPointLightRef.current = internalPointLight;

    // 6. Ground holographic / studio grid
    const gridHelper = new THREE.GridHelper(30, 30, theme === 'dark' ? 0x00f0ff : 0x0ea5e9, theme === 'dark' ? 0x1e293b : 0xcbd5e1);
    gridHelper.position.y = -4.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = theme === 'dark' ? 0.25 : 0.35;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // 7. Render Loop
    let lastTime = performance.now();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smoothly interpolate exploded factor using linear interpolation (lerp)
      if (assemblyRef.current) {
        currentExplodedRef.current = THREE.MathUtils.lerp(
          currentExplodedRef.current,
          targetExplodedRef.current,
          0.08
        );
        if (Math.abs(currentExplodedRef.current - targetExplodedRef.current) < 0.0005) {
          currentExplodedRef.current = targetExplodedRef.current;
        }
        assemblyRef.current.setExplodedFactor(currentExplodedRef.current);

        // Update live thermal heat dissipation pulse in thermal mode
        if (currentViewModeRef.current === 'thermal') {
          assemblyRef.current.updateThermalPulse(now / 1000);
        }
      }

      // Dynamically intensify internal chassis point light as layers expand
      if (internalPointLightRef.current) {
        internalPointLightRef.current.intensity = THREE.MathUtils.lerp(
          1.5,
          4.5,
          currentExplodedRef.current
        );
      }

      // Smoothly interpolate camera focus transition
      if (isTransitioningCam.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.07);
        controlsRef.current.target.lerp(targetCamLook.current, 0.07);

        if (
          cameraRef.current.position.distanceTo(targetCamPos.current) < 0.05 &&
          controlsRef.current.target.distanceTo(targetCamLook.current) < 0.05
        ) {
          isTransitioningCam.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (assemblyRef.current) assemblyRef.current.dispose();
    };
  }, []);

  // Update Model / Assembly: Support GLTF/GLB import with fallback to Procedural CAD
  useEffect(() => {
    if (!sceneRef.current) return;

    let isCancelled = false;

    const loadAssembly = async () => {
      // Clean up previous assembly
      if (assemblyRef.current) {
        sceneRef.current?.remove(assemblyRef.current.group);
        assemblyRef.current.dispose();
        assemblyRef.current = null;
      }

      // Determine GLB source if provided
      let glbSourceUrl: string | null = null;
      let displayFileName = '';

      if (customGlbFile) {
        glbSourceUrl = URL.createObjectURL(customGlbFile);
        displayFileName = customGlbFile.name;
      } else if (customGlbUrl) {
        glbSourceUrl = customGlbUrl;
        displayFileName = customGlbUrl.split('/').pop() || 'custom_model.glb';
      } else if (model.glbUrl) {
        glbSourceUrl = model.glbUrl;
        displayFileName = model.glbUrl.split('/').pop() || `${model.id}.glb`;
      }

      if (glbSourceUrl) {
        setIsGlbLoading(true);
        setGlbError(null);
        setGlbLoadProgress({
          loaded: 0,
          total: 100,
          percent: 10,
          stage: `INITIALIZING 3D ENGINE: ${displayFileName}`
        });

        try {
          const glbAssembly = await PhoneGLBAssembly.loadGLB(
            glbSourceUrl,
            model,
            (progress) => {
              if (!isCancelled) {
                setGlbLoadProgress(progress);
              }
            }
          );

          if (isCancelled) {
            glbAssembly.dispose();
            return;
          }

          assemblyRef.current = glbAssembly;
          glbAssembly.applyViewMode(currentViewModeRef.current);
          glbAssembly.setExplodedFactor(currentExplodedRef.current);
          sceneRef.current?.add(glbAssembly.group);

          setIsGlbActive(true);
          setActiveGlbName(displayFileName);
          onGlbLoaded?.({
            fileName: displayFileName,
            isGLB: true,
            componentCount: glbAssembly.partsMap.size
          });
          setIsGlbLoading(false);
          soundManager.playSelect();

          // Center camera
          targetCamPos.current.set(6.5, 4, 15.5);
          targetCamLook.current.set(0, 0, 0);
          isTransitioningCam.current = true;
          return;
        } catch (err) {
          console.warn('GLB asset loading failed, falling back to procedural CAD model:', err);
          if (!isCancelled) {
            setGlbError(
              `Could not load "${displayFileName}". Switched to high-fidelity Procedural CAD model. You can drag and drop your downloaded .glb file directly into the viewport anytime!`
            );
          }
        } finally {
          if (!isCancelled) {
            setIsGlbLoading(false);
          }
        }
      }

      // Procedural CAD Assembly Fallback / Default
      const proceduralAssembly = new Phone3DAssembly(model);
      assemblyRef.current = proceduralAssembly;
      proceduralAssembly.applyViewMode(currentViewModeRef.current);
      proceduralAssembly.setExplodedFactor(currentExplodedRef.current);
      sceneRef.current?.add(proceduralAssembly.group);

      setIsGlbActive(false);
      setActiveGlbName('');
      onGlbLoaded?.({
        fileName: '',
        isGLB: false,
        componentCount: proceduralAssembly.partsMap.size
      });

      // Reset camera look target to center
      targetCamPos.current.set(6.5, 4, 15.5);
      targetCamLook.current.set(0, 0, 0);
      isTransitioningCam.current = true;
    };

    loadAssembly();

    return () => {
      isCancelled = true;
    };
  }, [model.id, customGlbFile, customGlbUrl]);

  // Keep targetExplodedRef and isDisassembled state in sync with explodedProgress prop
  useEffect(() => {
    targetExplodedRef.current = explodedProgress;
    const disassembled = explodedProgress >= 0.5;
    isDisassembledRef.current = disassembled;
    setIsDisassembled(disassembled);
  }, [explodedProgress]);

  // Keep currentViewModeRef in sync
  useEffect(() => {
    currentViewModeRef.current = viewMode;
    if (assemblyRef.current) {
      assemblyRef.current.applyViewMode(viewMode);
    }
  }, [viewMode]);

  // 1. Connect DOM Events: bind active click event listeners to document.getElementById('assemble-btn') and document.getElementById('disassemble-btn')
  useEffect(() => {
    let lastActionTime = 0;

    const handleAssemble = (e?: Event) => {
      e?.preventDefault();
      const now = Date.now();
      if (now - lastActionTime < 100) return;
      lastActionTime = now;

      soundManager.playSelect();
      // Smoothly transition each part between assembled coordinates (0) and disassembled coordinates (1)
      const nextProgress = targetExplodedRef.current === 0 ? 1.0 : 0.0;
      targetExplodedRef.current = nextProgress;
      const disassembled = nextProgress >= 0.5;
      isDisassembledRef.current = disassembled;
      setIsDisassembled(disassembled);
      onExplodedChange?.(nextProgress);
    };

    const handleDisassemble = (e?: Event) => {
      e?.preventDefault();
      const now = Date.now();
      if (now - lastActionTime < 100) return;
      lastActionTime = now;

      soundManager.playExplode();
      // Smoothly transition each part between assembled coordinates (0) and disassembled coordinates (1)
      const nextProgress = targetExplodedRef.current === 1.0 ? 0.0 : 1.0;
      targetExplodedRef.current = nextProgress;
      const disassembled = nextProgress >= 0.5;
      isDisassembledRef.current = disassembled;
      setIsDisassembled(disassembled);
      onExplodedChange?.(nextProgress);
    };

    const assembleBtn = document.getElementById('assemble-btn');
    const disassembleBtn = document.getElementById('disassemble-btn');

    if (assembleBtn) {
      assembleBtn.addEventListener('click', handleAssemble);
    }
    if (disassembleBtn) {
      disassembleBtn.addEventListener('click', handleDisassemble);
    }

    // Expose window reference for inspection & automated verification
    (window as any).__phoneAssembly = {
      assemble: () => handleAssemble(),
      disassemble: () => handleDisassemble(),
      setTargetProgress: (val: number) => {
        const clamped = Math.max(0, Math.min(1, val));
        targetExplodedRef.current = clamped;
        const disassembled = clamped >= 0.5;
        isDisassembledRef.current = disassembled;
        setIsDisassembled(disassembled);
        onExplodedChange?.(clamped);
      },
      isDisassembled: () => isDisassembledRef.current,
      getProgress: () => currentExplodedRef.current
    };

    return () => {
      if (assembleBtn) {
        assembleBtn.removeEventListener('click', handleAssemble);
      }
      if (disassembleBtn) {
        disassembleBtn.removeEventListener('click', handleDisassemble);
      }
    };
  }, [onExplodedChange]);

  // Update Auto-Rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Update Highlighting
  useEffect(() => {
    if (assemblyRef.current) {
      const activeId = selectedComponent?.id || hoveredComponent?.id || null;
      assemblyRef.current.highlightComponent(activeId);
    }
  }, [selectedComponent, hoveredComponent]);

  // Update Theme dynamically
  useEffect(() => {
    if (!sceneRef.current) return;
    const isDark = theme === 'dark';
    sceneRef.current.background = new THREE.Color(isDark ? '#05070d' : '#f8fafc');

    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = isDark ? 2.2 : 2.4;
    }

    if (gridHelperRef.current) {
      const mat = gridHelperRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.color = new THREE.Color(isDark ? 0x00f0ff : 0x0ea5e9);
        mat.opacity = isDark ? 0.25 : 0.35;
      }
    }
  }, [theme]);

  // Handle Component Camera Focus
  useEffect(() => {
    if (selectedComponent && cameraRef.current && controlsRef.current && assemblyRef.current) {
      const partInfo = assemblyRef.current.partsMap.get(selectedComponent.id);
      if (partInfo) {
        // Calculate component's current animated world position
        const worldPos = new THREE.Vector3();
        const isGLB = 'gltfScene' in assemblyRef.current;
        if (isGLB && (assemblyRef.current as any).gltfScene) {
          const partBox = new THREE.Box3();
          let count = 0;
          (assemblyRef.current as any).gltfScene.traverse((child: any) => {
            if (child.isMesh && child.userData?.componentId === selectedComponent.id) {
              partBox.expandByObject(child);
              count++;
            }
          });
          if (count > 0 && !partBox.isEmpty()) {
            partBox.getCenter(worldPos);
          } else {
            partInfo.mesh.getWorldPosition(worldPos);
          }
        } else {
          partInfo.mesh.getWorldPosition(worldPos);
        }

        targetCamLook.current.copy(worldPos);
        // Position camera in front of the component with an offset
        const zOffset = selectedComponent.layerZ < 0 ? -4.5 : 4.5;
        targetCamPos.current.set(
          worldPos.x * 0.4 + (selectedComponent.position[0] > 0 ? 2.5 : -2.5),
          worldPos.y * 0.5 + 0.8,
          worldPos.z + zOffset
        );
        isTransitioningCam.current = true;
      }
    }
  }, [selectedComponent]);

  // Handle Camera Reset
  useEffect(() => {
    if (onResetCameraTrigger > 0 && cameraRef.current && controlsRef.current) {
      targetCamPos.current.set(6.5, 4, 15.5);
      targetCamLook.current.set(0, 0, 0);
      isTransitioningCam.current = true;
    }
  }, [onResetCameraTrigger]);

  // Raycasting for Hover & Click
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !cameraRef.current || !sceneRef.current || !assemblyRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(assemblyRef.current.group.children, true);

      if (intersects.length > 0) {
        // If the first intersection is a transparent outer shell, prioritize internal components
        // positioned directly beneath the ray so the user can easily hover & click internal parts
        let chosenHit = intersects[0];
        const isFirstHitOuter = Boolean(chosenHit.object.userData?.isOuterShell);
        if (isFirstHitOuter) {
          const internalHit = intersects.find((hit) => {
            let p: THREE.Object3D | null = hit.object;
            while (p && p !== assemblyRef.current?.group) {
              if (p.userData?.isInternal || (p.userData?.partData && !p.userData?.isOuterShell)) {
                return true;
              }
              p = p.parent;
            }
            return false;
          });
          if (internalHit) {
            chosenHit = internalHit;
          }
        }

        // Find ancestor with componentId
        let curObj: THREE.Object3D | null = chosenHit.object;
        let foundPart: ComponentPart | null = null;
        while (curObj && curObj !== assemblyRef.current.group) {
          if (curObj.userData && curObj.userData.partData) {
            foundPart = curObj.userData.partData;
            break;
          }
          curObj = curObj.parent;
        }

        if (foundPart) {
          if (hoveredComponent?.id !== foundPart.id) {
            soundManager.playHover();
            onHoverComponent(foundPart);
          }
          setHoverScreenPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          if (canvasRef.current) canvasRef.current.style.cursor = 'pointer';
          return;
        }
      }

      if (hoveredComponent) {
        onHoverComponent(null);
        setHoverScreenPos(null);
      }
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    },
    [hoveredComponent, onHoverComponent]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !cameraRef.current || !sceneRef.current || !assemblyRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(assemblyRef.current.group.children, true);

      if (intersects.length > 0) {
        let chosenHit = intersects[0];
        const isFirstHitOuter = Boolean(chosenHit.object.userData?.isOuterShell);
        if (isFirstHitOuter) {
          const internalHit = intersects.find((hit) => {
            let p: THREE.Object3D | null = hit.object;
            while (p && p !== assemblyRef.current?.group) {
              if (p.userData?.isInternal || (p.userData?.partData && !p.userData?.isOuterShell)) {
                return true;
              }
              p = p.parent;
            }
            return false;
          });
          if (internalHit) {
            chosenHit = internalHit;
          }
        }

        let curObj: THREE.Object3D | null = chosenHit.object;
        let foundPart: ComponentPart | null = null;
        while (curObj && curObj !== assemblyRef.current.group) {
          if (curObj.userData && curObj.userData.partData) {
            foundPart = curObj.userData.partData;
            break;
          }
          curObj = curObj.parent;
        }

        if (foundPart) {
          soundManager.playSelect();
          onSelectComponent(foundPart);
        }
      }
    },
    [onSelectComponent]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const name = file.name.toLowerCase();
      if (name.endsWith('.glb') || name.endsWith('.gltf')) {
        soundManager.playSelect();
        onDropGlbFile?.(file);
      } else {
        setGlbError('Please upload or drop a valid .glb or .gltf 3D smartphone asset file.');
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full h-full overflow-hidden select-none transition-colors duration-500 ${
        isDark ? 'bg-[#05070d] cyber-grid' : 'bg-slate-50'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
      />

      {/* GLB Model Loader Progress Spinner HUD */}
      <GLBLoaderHUD
        isLoading={isGlbLoading}
        progress={glbLoadProgress}
        modelName={activeGlbName || model.name}
        theme={theme}
        error={glbError}
        onDismissError={() => setGlbError(null)}
      />

      {/* Drag & Drop Visual Dropzone Overlay */}
      {isDraggingFile && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-cyan-950/80 border-4 border-dashed border-cyan-400 backdrop-blur-sm pointer-events-none p-6">
          <div className="text-center">
            <Upload className="w-14 h-14 text-cyan-400 mx-auto animate-bounce mb-3" />
            <h2 className="text-xl font-bold font-tech text-white uppercase tracking-wider">
              DROP .GLB SMARTPHONE ASSET
            </h2>
            <p className="text-xs font-mono-tech text-cyan-300 mt-1">
              Extract sub-mesh hierarchy, materials & link to hardware teardown
            </p>
          </div>
        </div>
      )}

      {/* Active Model Engine Badge in Viewport Corner */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center space-x-2">
        <div
          className={`px-2.5 py-1 rounded-full border text-[11px] font-mono-tech flex items-center space-x-1.5 backdrop-blur-md ${
            isGlbActive
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-sm shadow-cyan-500/10'
              : isDark
              ? 'bg-slate-900/80 border-slate-700/60 text-slate-400'
              : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isGlbActive ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'
            }`}
          />
          <span className="font-semibold">
            {isGlbActive ? `GLB ASSET: ${activeGlbName}` : 'PROCEDURAL CAD CORE'}
          </span>
        </div>
      </div>

      {/* Floating 3D Hover Tag HUD */}
      {hoveredComponent && hoverScreenPos && (
        <div
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30 transition-all duration-75"
          style={{
            left: `${hoverScreenPos.x}px`,
            top: `${hoverScreenPos.y}px`
          }}
        >
          <div
            className={`px-3 py-1.5 rounded border flex items-center space-x-2 backdrop-blur-md shadow-xl ${
              isDark
                ? 'border-cyan-400/40 bg-slate-950/90 shadow-cyan-500/10 text-white'
                : 'border-cyan-500/50 bg-white/95 shadow-slate-300/60 text-slate-900'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: hoveredComponent.highlightColor }}
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wide font-tech uppercase">
                {hoveredComponent.name}
              </span>
              <span className={`text-[10px] font-mono-tech ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                {hoveredComponent.codeName}
              </span>
            </div>
          </div>
          {/* Stem connector */}
          <div className={`w-[1px] h-3 mx-auto ${isDark ? 'bg-cyan-400/60' : 'bg-cyan-600/60'}`} />
        </div>
      )}
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';
import { PhoneModel, ComponentPart, ViewMode } from '../types';

// Helper to create high-detail canvas textures procedurally
function createChipTexture(title: string, sub: string, accentColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark matte silicon substrate
  ctx.fillStyle = '#0f131a';
  ctx.fillRect(0, 0, 512, 512);

  // Micro-circuit silicon wafer grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 512; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Silicon die boundary
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 472, 472);

  // Laser etched branding
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 210);

  ctx.fillStyle = accentColor;
  ctx.font = '600 24px "Chakra Petch", monospace';
  ctx.fillText(sub, 256, 260);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '18px monospace';
  ctx.fillText('TSMC 2nm GAA • 28.4B TRANSISTORS', 256, 310);
  ctx.fillText('AI NPU: 110 TOPS • SECURE ENCLAVE 3.0', 256, 340);

  // Pin 1 indicator dot
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(50, 50, 10, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createBatteryTexture(brand: string, capacity: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark metallic pouch finish
  ctx.fillStyle = '#111822';
  ctx.fillRect(0, 0, 512, 1024);

  // Warning & specs header
  ctx.fillStyle = '#00f0ff';
  ctx.font = 'bold 34px "Chakra Petch", monospace';
  ctx.fillText('SILICON-CARBON ANODE CELL', 40, 90);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "JetBrains Mono", monospace';
  ctx.fillText(capacity, 40, 150);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '22px monospace';
  ctx.fillText('Nominal: 3.86Vdc | Max Charge: 4.45Vdc', 40, 200);
  ctx.fillText('Volumetric Density: 910 Wh/L (CATL Gen 4)', 40, 235);
  ctx.fillText(`Custom Integrated For ${brand.toUpperCase()}`, 40, 270);

  // Safety barcode & certification badges
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  for (let x = 40; x < 470; x += 10) {
    const w = (x % 3 === 0) ? 6 : 2;
    ctx.fillRect(x, 320, w, 50);
  }

  // Regulatory warning icons
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 410, 432, 120);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('CAUTION: DO NOT PUNCTURE OR INCINERATE', 60, 450);
  ctx.font = '18px monospace';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('High Energy Density Matrix. Disassemble via', 60, 485);
  ctx.fillText('authorized technical disassembly guidelines only.', 60, 510);

  // Stretch-release adhesive pull tab indicators
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(180, 920, 152, 60);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PULL TO RELEASE', 256, 958);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createPcbTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // High-density PCB dark emerald solder-mask
  ctx.fillStyle = '#062d22';
  ctx.fillRect(0, 0, 512, 512);

  // Gold electrical traces
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 20; i < 500; i += 35) {
    ctx.moveTo(i, 20);
    ctx.lineTo(i + 20, 120);
    ctx.lineTo(i + 80, 200);
    ctx.lineTo(i + 140, 480);

    ctx.moveTo(20, i);
    ctx.lineTo(140, i + 30);
    ctx.lineTo(340, i + 10);
    ctx.lineTo(480, i + 40);
  }
  ctx.stroke();

  // Micro SMD gold bonding pads
  ctx.fillStyle = '#facc15';
  for (let x = 30; x < 500; x += 40) {
    for (let y = 30; y < 500; y += 40) {
      if ((x + y) % 80 === 0) {
        ctx.fillRect(x, y, 6, 6);
      }
    }
  }

  // Ground copper plane hash
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.25)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 512; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createCoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  // Draw concentric copper litz induction turns
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 6;
  for (let r = 50; r < 210; r += 14) {
    ctx.beginPath();
    ctx.arc(256, 256, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Ferrite guide spokes
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(a) * 45, 256 + Math.sin(a) * 45);
    ctx.lineTo(256 + Math.cos(a) * 220, 256 + Math.sin(a) * 220);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function computeExplodedTargetPosition(part: ComponentPart): THREE.Vector3 {
  let explodedZ = 0;
  switch (part.meshType) {
    case 'display_panel':
      explodedZ = -7.6;
      break;
    case 'chassis_frame':
      explodedZ = -4.2;
      break;
    case 'vapor_chamber':
      explodedZ = -1.8;
      break;
    case 'motherboard':
      explodedZ = 0.8;
      break;
    case 'soc':
      // Lifted forward from motherboard to stand out prominently
      explodedZ = 2.6;
      break;
    case 'modem':
      // Lifted forward alongside SoC
      explodedZ = 2.6;
      break;
    case 'memory_chips':
      // Lifted forward
      explodedZ = 2.9;
      break;
    case 'battery':
      explodedZ = 5.0;
      break;
    case 'sensors_cluster':
      explodedZ = 6.6;
      break;
    case 'audio_taptic':
      explodedZ = 7.8;
      break;
    case 'camera_module':
      explodedZ = 9.2;
      break;
    case 'back_glass':
      explodedZ = 11.4;
      break;
    default:
      explodedZ = part.layerZ * 3.8;
      break;
  }

  return new THREE.Vector3(part.position[0], part.position[1], explodedZ);
}

export interface Phone3DAssemblyOptions {
  internalsOnly?: boolean;
}

export class Phone3DAssembly {
  public group: THREE.Group;
  public partsMap: Map<string, { mesh: THREE.Object3D; basePos: THREE.Vector3; targetPos: THREE.Vector3; part: ComponentPart }>;
  public model: PhoneModel;
  public options?: Phone3DAssemblyOptions;
  private currentViewMode: ViewMode = 'realistic';
  private currentExplodedFactor: number = 0;
  private texturesToDispose: THREE.Texture[] = [];
  private materialsToDispose: THREE.Material[] = [];
  private geometriesToDispose: THREE.BufferGeometry[] = [];

  constructor(model: PhoneModel, options?: Phone3DAssemblyOptions) {
    this.model = model;
    this.options = options;
    this.group = new THREE.Group();
    this.partsMap = new Map();
    this.build();
  }

  private build() {
    const isApple = this.model.brand === 'Apple';
    const isSamsung = this.model.brand === 'Samsung';
    const isOnePlus = this.model.brand === 'OnePlus';

    const pcbTex = createPcbTexture();
    const coilTex = createCoilTexture();
    this.texturesToDispose.push(pcbTex, coilTex);

    for (const part of this.model.components) {
      if (this.options?.internalsOnly) {
        // In hybrid mode, GLB provides exterior frame, chassis, and back glass.
        // Keep code-generated internal components active (battery, processor chip, logic board, cooling chamber, etc.)
        const isExterior = part.category === 'display' || part.category === 'chassis' || part.meshType === 'back_glass';
        if (isExterior) continue;
      }

      const partGroup = new THREE.Group();
      partGroup.name = part.id;
      partGroup.userData = { componentId: part.id, partData: part };

      const basePos = new THREE.Vector3(...part.position);
      // Exploded target pos provides generous, distinct separation between all layers
      const targetPos = computeExplodedTargetPosition(part);

      // Generate the appropriate procedural 3D mesh based on part.meshType
      let primaryMesh: THREE.Object3D;

      switch (part.meshType) {
        case 'display_panel': {
          // Front display glass + OLED matrix + bezel
          const dispGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(dispGeo);
          const dispMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(part.colorHex),
            roughness: 0.1,
            metalness: 0.1,
            transmission: 0.2,
            reflectivity: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
          });
          this.materialsToDispose.push(dispMat);
          primaryMesh = new THREE.Mesh(dispGeo, dispMat);

          // Sub-surface OLED glow grid
          const oledGeo = new THREE.PlaneGeometry(part.dimensions[0] * 0.94, part.dimensions[1] * 0.96);
          this.geometriesToDispose.push(oledGeo);
          const oledMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#030712'),
            emissive: new THREE.Color(this.model.accentColor),
            emissiveIntensity: 0.08,
            roughness: 0.2
          });
          this.materialsToDispose.push(oledMat);
          const oledMesh = new THREE.Mesh(oledGeo, oledMat);
          oledMesh.position.z = 0.03;
          primaryMesh.add(oledMesh);

          // Front punch-hole selfie camera cutout
          const punchGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 24);
          this.geometriesToDispose.push(punchGeo);
          const punchMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.1 });
          this.materialsToDispose.push(punchMat);
          const punchMesh = new THREE.Mesh(punchGeo, punchMat);
          punchMesh.rotation.x = Math.PI / 2;
          punchMesh.position.set(0, isApple ? 3.15 : 3.25, 0.03);
          primaryMesh.add(punchMesh);
          break;
        }

        case 'chassis_frame': {
          // Unibody outer frame with rounded corners and antenna bands
          const frameGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(frameGeo);
          const frameMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(this.model.frameColor),
            metalness: 0.92,
            roughness: 0.3
          });
          this.materialsToDispose.push(frameMat);
          primaryMesh = new THREE.Mesh(frameGeo, frameMat);

          // Hollow internal cavity (represented by contrasting midplate mesh)
          const midplateGeo = new THREE.BoxGeometry(part.dimensions[0] * 0.92, part.dimensions[1] * 0.95, 0.08);
          this.geometriesToDispose.push(midplateGeo);
          const midplateMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#64748b'),
            metalness: 0.7,
            roughness: 0.5
          });
          this.materialsToDispose.push(midplateMat);
          const midplate = new THREE.Mesh(midplateGeo, midplateMat);
          primaryMesh.add(midplate);

          // USB-C port at the bottom
          const portGeo = new THREE.BoxGeometry(0.55, 0.16, 0.2);
          this.geometriesToDispose.push(portGeo);
          const portMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9 });
          this.materialsToDispose.push(portMat);
          const portMesh = new THREE.Mesh(portGeo, portMat);
          portMesh.position.set(0, -part.dimensions[1] / 2, 0);
          primaryMesh.add(portMesh);

          // Side volume & power buttons
          const btnGeo = new THREE.BoxGeometry(0.06, 0.6, 0.1);
          this.geometriesToDispose.push(btnGeo);
          const btnMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(this.model.accentColor), metalness: 0.8 });
          this.materialsToDispose.push(btnMat);
          const pwrBtn = new THREE.Mesh(btnGeo, btnMat);
          pwrBtn.position.set(part.dimensions[0] / 2 + 0.03, 1.2, 0);
          primaryMesh.add(pwrBtn);

          const volBtn = new THREE.Mesh(btnGeo, btnMat);
          volBtn.scale.set(1, 1.8, 1);
          volBtn.position.set(-part.dimensions[0] / 2 - 0.03, 1.2, 0);
          primaryMesh.add(volBtn);
          break;
        }

        case 'vapor_chamber': {
          // Gleaming electrolytic copper vapor chamber
          const vcGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(vcGeo);
          const vcMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#ea580c'),
            roughness: 0.25,
            metalness: 0.95
          });
          this.materialsToDispose.push(vcMat);
          primaryMesh = new THREE.Mesh(vcGeo, vcMat);

          // Thermal capillary embossed lines
          const ribGeo = new THREE.BoxGeometry(part.dimensions[0] * 0.88, 0.08, 0.02);
          this.geometriesToDispose.push(ribGeo);
          const ribMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, metalness: 0.9, roughness: 0.2 });
          this.materialsToDispose.push(ribMat);
          for (let y = -1.6; y <= 1.6; y += 0.4) {
            const rib = new THREE.Mesh(ribGeo, ribMat);
            rib.position.set(0, y, 0.035);
            primaryMesh.add(rib);
          }
          break;
        }

        case 'motherboard': {
          // PCB board with golden micro-traces texture
          const mbGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(mbGeo);
          const mbMat = new THREE.MeshStandardMaterial({
            map: pcbTex,
            roughness: 0.35,
            metalness: 0.5
          });
          this.materialsToDispose.push(mbMat);
          primaryMesh = new THREE.Mesh(mbGeo, mbMat);

          // Faraday EMI shield metal cans
          const canGeo = new THREE.BoxGeometry(1.2, 1.4, 0.09);
          this.geometriesToDispose.push(canGeo);
          const canMat = new THREE.MeshStandardMaterial({
            color: 0xd1d5db,
            metalness: 0.95,
            roughness: 0.2
          });
          this.materialsToDispose.push(canMat);
          const canMesh1 = new THREE.Mesh(canGeo, canMat);
          canMesh1.position.set(0.6, 0.2, 0.06);
          primaryMesh.add(canMesh1);

          // SMD micro capacitors and resistors
          const smdGeo = new THREE.BoxGeometry(0.08, 0.05, 0.04);
          this.geometriesToDispose.push(smdGeo);
          const smdMat = new THREE.MeshStandardMaterial({ color: 0x92400e, metalness: 0.6 });
          this.materialsToDispose.push(smdMat);
          for (let i = 0; i < 24; i++) {
            const smd = new THREE.Mesh(smdGeo, smdMat);
            smd.position.set(
              (Math.random() - 0.5) * (part.dimensions[0] * 0.8),
              (Math.random() - 0.5) * (part.dimensions[1] * 0.8),
              0.055
            );
            primaryMesh.add(smd);
          }
          break;
        }

        case 'soc': {
          // The brain chip with custom laser etching
          const socTex = createChipTexture(
            isApple ? 'APPLE A20 PRO' : isSamsung ? 'SNAPDRAGON 8 ELITE' : 'SNAPDRAGON 8 GEN 5',
            isApple ? '2nm TSMC N2P Silicon' : 'TSMC 2nm GAA Extreme',
            this.model.accentColor
          );
          this.texturesToDispose.push(socTex);

          const socGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(socGeo);
          const socMat = new THREE.MeshStandardMaterial({
            map: socTex,
            roughness: 0.2,
            metalness: 0.8
          });
          this.materialsToDispose.push(socMat);
          primaryMesh = new THREE.Mesh(socGeo, socMat);

          // Edge neon accent glow ring
          const edgeGeo = new THREE.BoxGeometry(part.dimensions[0] * 1.04, part.dimensions[1] * 1.04, 0.02);
          this.geometriesToDispose.push(edgeGeo);
          const edgeMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(this.model.accentColor),
            wireframe: true
          });
          this.materialsToDispose.push(edgeMat);
          const edgeGlow = new THREE.Mesh(edgeGeo, edgeMat);
          edgeGlow.position.z = -0.01;
          primaryMesh.add(edgeGlow);
          break;
        }

        case 'modem': {
          // 5G RF Baseband transceiver
          const modemGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(modemGeo);
          const modemMat = new THREE.MeshStandardMaterial({
            color: 0x1e1b4b,
            metalness: 0.85,
            roughness: 0.25
          });
          this.materialsToDispose.push(modemMat);
          primaryMesh = new THREE.Mesh(modemGeo, modemMat);

          // Gold wire bond lines
          const lineGeo = new THREE.BoxGeometry(part.dimensions[0] * 0.8, 0.04, 0.02);
          this.geometriesToDispose.push(lineGeo);
          const lineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
          this.materialsToDispose.push(lineMat);
          for (let y = -0.25; y <= 0.25; y += 0.12) {
            const wire = new THREE.Mesh(lineGeo, lineMat);
            wire.position.set(0, y, 0.04);
            primaryMesh.add(wire);
          }
          break;
        }

        case 'memory_chips': {
          // LPDDR5X + Flash Storage IC packages
          const memGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(memGeo);
          const memMat = new THREE.MeshStandardMaterial({
            color: 0x18181b,
            roughness: 0.2,
            metalness: 0.6
          });
          this.materialsToDispose.push(memMat);
          primaryMesh = new THREE.Mesh(memGeo, memMat);

          // Laser label
          const labelGeo = new THREE.PlaneGeometry(0.8, 0.4);
          this.geometriesToDispose.push(labelGeo);
          const labelMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(this.model.accentColor),
            wireframe: true
          });
          this.materialsToDispose.push(labelMat);
          const label = new THREE.Mesh(labelGeo, labelMat);
          label.position.z = 0.03;
          primaryMesh.add(label);
          break;
        }

        case 'battery': {
          // Realistic high-density battery pouch with printed warning texture
          const battTex = createBatteryTexture(
            this.model.brand,
            this.model.keySpecs.battery.split(' ')[0] + ' mAh'
          );
          this.texturesToDispose.push(battTex);

          const battGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(battGeo);
          const battMat = new THREE.MeshStandardMaterial({
            map: battTex,
            roughness: 0.35,
            metalness: 0.4
          });
          this.materialsToDispose.push(battMat);
          primaryMesh = new THREE.Mesh(battGeo, battMat);

          // Battery flex cable ribbon & connector
          const ribbonGeo = new THREE.BoxGeometry(0.4, 0.6, 0.03);
          this.geometriesToDispose.push(ribbonGeo);
          const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
          this.materialsToDispose.push(ribbonMat);
          const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
          ribbon.position.set(0.6, part.dimensions[1] / 2 + 0.25, 0.05);
          primaryMesh.add(ribbon);
          break;
        }

        case 'camera_module': {
          if (isSamsung) {
            primaryMesh = this.buildSamsungCamera(part);
          } else if (isApple) {
            primaryMesh = this.buildAppleCamera(part);
          } else {
            primaryMesh = this.buildOnePlusCamera(part);
          }
          break;
        }

        case 'sensors_cluster': {
          // Ultrasonic sensor pad & LiDAR/IMU
          const sensorGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(sensorGeo);
          const sensorMat = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            metalness: 0.6,
            roughness: 0.3
          });
          this.materialsToDispose.push(sensorMat);
          primaryMesh = new THREE.Mesh(sensorGeo, sensorMat);

          // Piezoelectric acoustic grid pattern
          const gridGeo = new THREE.PlaneGeometry(part.dimensions[0] * 0.9, part.dimensions[1] * 0.9);
          this.geometriesToDispose.push(gridGeo);
          const gridMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(this.model.accentColor),
            wireframe: true
          });
          this.materialsToDispose.push(gridMat);
          const gridMesh = new THREE.Mesh(gridGeo, gridMat);
          gridMesh.position.z = 0.03;
          primaryMesh.add(gridMesh);
          break;
        }

        case 'audio_taptic': {
          // Haptic engine linear motor + stereo bottom speaker
          const hapticGroup = new THREE.Group();
          const motorGeo = new THREE.BoxGeometry(1.4, 0.5, 0.12);
          this.geometriesToDispose.push(motorGeo);
          const motorMat = new THREE.MeshStandardMaterial({
            color: 0x475569,
            metalness: 0.85,
            roughness: 0.3
          });
          this.materialsToDispose.push(motorMat);
          const motor = new THREE.Mesh(motorGeo, motorMat);
          motor.position.set(-0.5, 0, 0);
          hapticGroup.add(motor);

          // Tungsten mass indicator
          const slugGeo = new THREE.BoxGeometry(0.8, 0.3, 0.08);
          this.geometriesToDispose.push(slugGeo);
          const slugMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.1 });
          this.materialsToDispose.push(slugMat);
          const slug = new THREE.Mesh(slugGeo, slugMat);
          slug.position.set(-0.5, 0, 0.04);
          hapticGroup.add(slug);

          // Speaker acoustic box
          const spkGeo = new THREE.BoxGeometry(0.9, 0.5, 0.12);
          this.geometriesToDispose.push(spkGeo);
          const spkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
          this.materialsToDispose.push(spkMat);
          const spk = new THREE.Mesh(spkGeo, spkMat);
          spk.position.set(0.7, 0, 0);
          hapticGroup.add(spk);

          primaryMesh = hapticGroup;
          break;
        }

        case 'back_glass': {
          // Frosted ceramic back cover + wireless charging induction coil
          const backGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(backGeo);
          const backMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(this.model.backColor),
            roughness: 0.25,
            metalness: 0.35,
            transmission: 0.4,
            reflectivity: 0.8,
            clearcoat: 0.8,
            clearcoatRoughness: 0.15
          });
          this.materialsToDispose.push(backMat);
          primaryMesh = new THREE.Mesh(backGeo, backMat);

          // Wireless charging copper induction coil
          const coilGeo = new THREE.PlaneGeometry(2.4, 2.4);
          this.geometriesToDispose.push(coilGeo);
          const coilMat = new THREE.MeshStandardMaterial({
            map: coilTex,
            transparent: true,
            opacity: 0.9,
            roughness: 0.3,
            metalness: 0.8
          });
          this.materialsToDispose.push(coilMat);
          const coilMesh = new THREE.Mesh(coilGeo, coilMat);
          coilMesh.position.set(0, -0.4, -0.035);
          coilMesh.rotation.y = Math.PI; // Face inward toward phone center
          primaryMesh.add(coilMesh);
          break;
        }

        default: {
          const genericGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], part.dimensions[2]);
          this.geometriesToDispose.push(genericGeo);
          const genericMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(part.colorHex) });
          this.materialsToDispose.push(genericMat);
          primaryMesh = new THREE.Mesh(genericGeo, genericMat);
        }
      }

      // Propagate user data to all child meshes for raycasting hit detection
      primaryMesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.userData = { componentId: part.id, partData: part };
        }
      });

      partGroup.position.copy(basePos);
      partGroup.add(primaryMesh);
      this.group.add(partGroup);

      this.partsMap.set(part.id, {
        mesh: partGroup,
        basePos,
        targetPos,
        part
      });
    }
  }

  // Update exploded distance (0 = fully assembled, 1 = fully exploded)
  public setExplodedFactor(factor: number) {
    this.currentExplodedFactor = factor;

    this.partsMap.forEach(({ mesh, basePos, targetPos, part }) => {
      mesh.position.lerpVectors(basePos, targetPos, factor);

      // In realistic mode, make exterior casings slightly transparent (opacity around 30-40% or glass-like)
      // when exploded view is active, so users can still see internal chips and 5G modem without blocking
      if (this.currentViewMode === 'realistic') {
        const isExterior =
          part.meshType === 'display_panel' ||
          part.meshType === 'chassis_frame' ||
          part.meshType === 'back_glass';

        if (isExterior) {
          const baseOp = part.opacity ?? 1.0;
          // Smoothly interpolate opacity from base/opaque down to 0.35 (35% glass-like transparency)
          const targetOpacity = THREE.MathUtils.lerp(baseOp, 0.35, Math.min(factor * 1.5, 1.0));
          const isPartiallyTransparent = factor > 0.02;

          mesh.traverse((child) => {
            const m = child as THREE.Mesh;
            if (m.isMesh && m.material) {
              const mats = Array.isArray(m.material) ? m.material : [m.material];
              mats.forEach((mat) => {
                const stdMat = mat as THREE.MeshStandardMaterial;
                stdMat.transparent = isPartiallyTransparent || (part.opacity !== undefined && part.opacity < 1);
                stdMat.opacity = targetOpacity;
                stdMat.depthWrite = !isPartiallyTransparent;
              });
            }
          });
        }
      }
    });
  }

  // Highlight a specific component mesh
  public highlightComponent(componentId: string | null) {
    this.partsMap.forEach(({ mesh, part }) => {
      mesh.traverse((child) => {
        const m = child as THREE.Mesh;
        if (m.isMesh && m.material) {
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => {
            const stdMat = mat as THREE.MeshStandardMaterial;
            if (stdMat.emissive) {
              if (part.id === componentId) {
                stdMat.emissive = new THREE.Color(part.highlightColor);
                stdMat.emissiveIntensity = 0.55;
              } else {
                stdMat.emissive = new THREE.Color(0x000000);
                stdMat.emissiveIntensity = 0.0;
              }
            }
          });
        }
      });
    });
  }

  // Apply visual render modes
  public applyViewMode(mode: ViewMode) {
    this.currentViewMode = mode;
    this.partsMap.forEach(({ mesh, part }) => {
      mesh.traverse((child) => {
        const m = child as THREE.Mesh;
        if (m.isMesh && m.material) {
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => {
            const stdMat = mat as THREE.MeshStandardMaterial;
            switch (mode) {
              case 'wireframe':
                stdMat.wireframe = true;
                if (stdMat.color) stdMat.color.set(new THREE.Color(part.highlightColor));
                break;
              case 'xray':
                stdMat.wireframe = false;
                stdMat.transparent = true;
                stdMat.opacity = part.meshType === 'display_panel' || part.meshType === 'back_glass' ? 0.25 : 0.85;
                if (stdMat.emissive) {
                  stdMat.emissive = new THREE.Color(part.highlightColor);
                  stdMat.emissiveIntensity = 0.15;
                }
                break;
              case 'thermal':
                stdMat.wireframe = false;
                // Exterior casings are semi-transparent in thermal mode so internal heat core is visible
                if (part.meshType === 'display_panel' || part.meshType === 'back_glass') {
                  stdMat.transparent = true;
                  stdMat.opacity = 0.3;
                  stdMat.depthWrite = false;
                  stdMat.color.set('#0284c7'); // Cool blue infrared glass
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#0369a1');
                    stdMat.emissiveIntensity = 0.08;
                  }
                } else if (part.category === 'processor') {
                  // SoC / CPU Core: White-Hot Crimson Thermal Peak (~92°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#dc2626');
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#ff0033');
                    stdMat.emissiveIntensity = 0.85;
                  }
                } else if (part.category === 'connectivity') {
                  // 5G Modem & RF Power Amplifier: Fiery Hot Orange-Red (~78°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#ea580c');
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#ff5500');
                    stdMat.emissiveIntensity = 0.65;
                  }
                } else if (part.category === 'cooling') {
                  // 3D Vapor Chamber & Graphite Sheets: Heat Dissipation Gradient (~58°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#f97316'); // Bright thermal orange
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#ea580c');
                    stdMat.emissiveIntensity = 0.5;
                  }
                } else if (part.category === 'battery') {
                  // Fast-Charging Battery Cell: Warm Golden Amber (~45°C - 50°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#eab308'); // Warm amber-yellow
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#ca8a04');
                    stdMat.emissiveIntensity = 0.3;
                  }
                } else if (part.category === 'chassis') {
                  // Titanium / Aluminum Perimeter Frame: Heat Sink Dissipation (~36°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#10b981'); // Emerald/green dissipating into cyan
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#059669');
                    stdMat.emissiveIntensity = 0.2;
                  }
                } else if (part.category === 'motherboard' || part.category === 'memory') {
                  // Logic Board & Memory Substrates (~52°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#f59e0b');
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#d97706');
                    stdMat.emissiveIntensity = 0.35;
                  }
                } else {
                  // Idle Camera sensors, Audio actuators, Taptic motor (~26°C - 28°C)
                  stdMat.transparent = false;
                  stdMat.depthWrite = true;
                  stdMat.color.set('#1e3a8a'); // Cool deep indigo
                  if (stdMat.emissive) {
                    stdMat.emissive.set('#172554');
                    stdMat.emissiveIntensity = 0.05;
                  }
                }
                break;
              case 'realistic':
              default:
                stdMat.wireframe = false;
                stdMat.transparent = Boolean(part.opacity && part.opacity < 1);
                if (part.opacity) stdMat.opacity = part.opacity;
                if (stdMat.emissive) {
                  stdMat.emissive.set(0x000000);
                  stdMat.emissiveIntensity = 0;
                }
                break;
            }
          });
        }
      });
    });
  }

  // Animate dynamic thermal heat dissipation pulsing
  public updateThermalPulse(time: number) {
    if (this.currentViewMode !== 'thermal') return;

    this.partsMap.forEach(({ mesh, part }) => {
      mesh.traverse((child) => {
        const m = child as THREE.Mesh;
        if (m.isMesh && m.material) {
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => {
            const stdMat = mat as THREE.MeshStandardMaterial;
            if (!stdMat.emissive) return;

            if (part.category === 'processor') {
              // SoC Core: intense micro-load fluctuation
              stdMat.emissiveIntensity = 0.75 + Math.sin(time * 3.5) * 0.2;
            } else if (part.category === 'connectivity') {
              // 5G RF: pulsed RF packet transmissions
              stdMat.emissiveIntensity = 0.55 + Math.sin(time * 4.0 + 1.2) * 0.18;
            } else if (part.category === 'cooling') {
              // Vapor chamber: fluid phase-change thermal dissipation wave
              stdMat.emissiveIntensity = 0.42 + Math.sin(time * 2.2 + 2.0) * 0.12;
            } else if (part.category === 'battery') {
              // Battery: slow charge curve
              stdMat.emissiveIntensity = 0.28 + Math.sin(time * 1.5 + 0.5) * 0.06;
            } else if (part.category === 'chassis') {
              // Frame: ambient dissipation
              stdMat.emissiveIntensity = 0.18 + Math.sin(time * 2.0 + 2.8) * 0.04;
            }
          });
        }
      });
    });
  }

  // 1. Samsung Galaxy S26 Ultra: Authentic 5-Ring Dual-Column "P" Layout
  private buildSamsungCamera(part: ComponentPart): THREE.Group {
    const camGroup = new THREE.Group();

    // Slim subterranean chassis carrier plate behind back glass
    const basePlateGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], 0.05);
    this.geometriesToDispose.push(basePlateGeo);
    const basePlateMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.9,
      roughness: 0.25
    });
    this.materialsToDispose.push(basePlateMat);
    const basePlate = new THREE.Mesh(basePlateGeo, basePlateMat);
    basePlate.position.z = -0.02;
    camGroup.add(basePlate);

    // Left Column X = -0.38, Right Column X = +0.38
    const leftColX = -0.38;
    const rightColX = 0.38;

    // Helper for circular camera rings with titanium armor bezel & multi-coated sapphire glass
    const createCameraRing = (x: number, y: number, radius: number, lensColorHex: number) => {
      // Outer titanium armor ring (bezel)
      const ringGeo = new THREE.CylinderGeometry(radius, radius + 0.04, 0.16, 32);
      this.geometriesToDispose.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.95,
        roughness: 0.2
      });
      this.materialsToDispose.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(x, y, 0.08);
      camGroup.add(ringMesh);

      // Inner dark stepped barrel
      const innerBarrelGeo = new THREE.CylinderGeometry(radius * 0.8, radius * 0.8, 0.08, 32);
      this.geometriesToDispose.push(innerBarrelGeo);
      const innerBarrelMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.8,
        roughness: 0.3
      });
      this.materialsToDispose.push(innerBarrelMat);
      const innerBarrel = new THREE.Mesh(innerBarrelGeo, innerBarrelMat);
      innerBarrel.rotation.x = Math.PI / 2;
      innerBarrel.position.set(x, y, 0.12);
      camGroup.add(innerBarrel);

      // Sapphire glass element with high reflection and AR coat tint
      const glassGeo = new THREE.CylinderGeometry(radius * 0.74, radius * 0.74, 0.03, 32);
      this.geometriesToDispose.push(glassGeo);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(lensColorHex),
        transmission: 0.9,
        roughness: 0.04,
        reflectivity: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05
      });
      this.materialsToDispose.push(glassMat);
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.rotation.x = Math.PI / 2;
      glassMesh.position.set(x, y, 0.16);
      camGroup.add(glassMesh);

      // Internal optical aperture dot
      const irisGeo = new THREE.CircleGeometry(radius * 0.35, 16);
      this.geometriesToDispose.push(irisGeo);
      const irisMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
      this.materialsToDispose.push(irisMat);
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisMesh.position.set(x, y, 0.17);
      camGroup.add(irisMesh);
    };

    // 1. LEFT COLUMN - 1. Main Wide Lens (200MP ISOCELL HP3)
    createCameraRing(leftColX, 0.82, 0.34, 0x0284c7);

    // 1. LEFT COLUMN - 2. Ultrawide Lens (50MP ISOCELL)
    createCameraRing(leftColX, 0.02, 0.32, 0x0f766e);

    // 1. LEFT COLUMN - 3. Periscope Telephoto Lens (50MP 5x Folded Prism)
    const periY = -0.78;
    // Outer titanium square bezel with rounded appearance
    const periBezelGeo = new THREE.BoxGeometry(0.68, 0.68, 0.16);
    this.geometriesToDispose.push(periBezelGeo);
    const periBezelMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.2
    });
    this.materialsToDispose.push(periBezelMat);
    const periBezel = new THREE.Mesh(periBezelGeo, periBezelMat);
    periBezel.position.set(leftColX, periY, 0.08);
    camGroup.add(periBezel);

    // Inner dark light tunnel
    const periTunnelGeo = new THREE.BoxGeometry(0.50, 0.50, 0.14);
    this.geometriesToDispose.push(periTunnelGeo);
    const periTunnelMat = new THREE.MeshStandardMaterial({
      color: 0x050811,
      metalness: 0.9,
      roughness: 0.15
    });
    this.materialsToDispose.push(periTunnelMat);
    const periTunnel = new THREE.Mesh(periTunnelGeo, periTunnelMat);
    periTunnel.position.set(leftColX, periY, 0.10);
    camGroup.add(periTunnel);

    // Folded prism reflective glass face
    const periGlassGeo = new THREE.PlaneGeometry(0.44, 0.44);
    this.geometriesToDispose.push(periGlassGeo);
    const periGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.04,
      metalness: 0.2,
      transmission: 0.85,
      reflectivity: 0.98,
      clearcoat: 1.0
    });
    this.materialsToDispose.push(periGlassMat);
    const periGlass = new THREE.Mesh(periGlassGeo, periGlassMat);
    periGlass.position.set(leftColX, periY, 0.17);
    camGroup.add(periGlass);

    // 2. RIGHT COLUMN - 4. Secondary Telephoto/Zoom Lens (50MP 3x Portrait)
    createCameraRing(rightColX, 0.52, 0.29, 0x0369a1);

    // 2. RIGHT COLUMN - 5. Smaller ring containing Laser Autofocus and LED Flash module
    const sensorRingY = -0.06;
    const smallRingGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.14, 32);
    this.geometriesToDispose.push(smallRingGeo);
    const smallRingMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.2
    });
    this.materialsToDispose.push(smallRingMat);
    const smallRing = new THREE.Mesh(smallRingGeo, smallRingMat);
    smallRing.rotation.x = Math.PI / 2;
    smallRing.position.set(rightColX, sensorRingY, 0.07);
    camGroup.add(smallRing);

    // Inner dark faceplate inside the 5th ring
    const smallFaceGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 32);
    this.geometriesToDispose.push(smallFaceGeo);
    const smallFaceMat = new THREE.MeshStandardMaterial({
      color: 0x0b0f19,
      roughness: 0.3
    });
    this.materialsToDispose.push(smallFaceMat);
    const smallFace = new THREE.Mesh(smallFaceGeo, smallFaceMat);
    smallFace.rotation.x = Math.PI / 2;
    smallFace.position.set(rightColX, sensorRingY, 0.12);
    camGroup.add(smallFace);

    // Laser Autofocus sensor dot (glossy infrared aperture)
    const laserGeo = new THREE.CircleGeometry(0.06, 16);
    this.geometriesToDispose.push(laserGeo);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x7f1d1d });
    this.materialsToDispose.push(laserMat);
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(rightColX, sensorRingY + 0.08, 0.15);
    camGroup.add(laserMesh);

    // Dual-tone LED Flash (amber/white phosphor die with diffuser)
    const flashGeo = new THREE.BoxGeometry(0.12, 0.09, 0.02);
    this.geometriesToDispose.push(flashGeo);
    const flashMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: new THREE.Color(0xca8a04),
      emissiveIntensity: 0.35,
      roughness: 0.3
    });
    this.materialsToDispose.push(flashMat);
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.set(rightColX, sensorRingY - 0.06, 0.15);
    camGroup.add(flashMesh);

    return camGroup;
  }

  // 2. iPhone 18 Pro: Authentic Triangular Matrix Layout on Raised Square Bump
  private buildAppleCamera(part: ComponentPart): THREE.Group {
    const camGroup = new THREE.Group();

    // Raised square camera bump with sculpted molded glass plateau
    const bumpGeo = new THREE.BoxGeometry(part.dimensions[0], part.dimensions[1], 0.12);
    this.geometriesToDispose.push(bumpGeo);
    const bumpMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(this.model.backColor),
      roughness: 0.25,
      metalness: 0.4,
      transmission: 0.35,
      reflectivity: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12
    });
    this.materialsToDispose.push(bumpMat);
    const bump = new THREE.Mesh(bumpGeo, bumpMat);
    camGroup.add(bump);

    // Polished glass chamfer border
    const chamferGeo = new THREE.BoxGeometry(part.dimensions[0] * 0.98, part.dimensions[1] * 0.98, 0.13);
    this.geometriesToDispose.push(chamferGeo);
    const chamferMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.1
    });
    this.materialsToDispose.push(chamferMat);
    const chamfer = new THREE.Mesh(chamferGeo, chamferMat);
    chamfer.position.z = -0.01;
    camGroup.add(chamfer);

    // Helper for iPhone Pro titanium lens rings
    const createAppleLens = (x: number, y: number, lensColorHex: number) => {
      // Grade 5 Titanium raised trim ring
      const ringGeo = new THREE.CylinderGeometry(0.36, 0.38, 0.16, 32);
      this.geometriesToDispose.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.92,
        roughness: 0.2
      });
      this.materialsToDispose.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(x, y, 0.10);
      camGroup.add(ringMesh);

      // Inner stepped baffle
      const baffleGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 32);
      this.geometriesToDispose.push(baffleGeo);
      const baffleMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.85,
        roughness: 0.3
      });
      this.materialsToDispose.push(baffleMat);
      const baffle = new THREE.Mesh(baffleGeo, baffleMat);
      baffle.rotation.x = Math.PI / 2;
      baffle.position.set(x, y, 0.14);
      camGroup.add(baffle);

      // Sapphire crystal glass element
      const glassGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.03, 32);
      this.geometriesToDispose.push(glassGeo);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(lensColorHex),
        transmission: 0.92,
        roughness: 0.03,
        reflectivity: 1.0,
        clearcoat: 1.0
      });
      this.materialsToDispose.push(glassMat);
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.rotation.x = Math.PI / 2;
      glassMesh.position.set(x, y, 0.17);
      camGroup.add(glassMesh);

      // Inner optical sensor aperture
      const irisGeo = new THREE.CircleGeometry(0.11, 16);
      this.geometriesToDispose.push(irisGeo);
      const irisMat = new THREE.MeshBasicMaterial({ color: 0x030712 });
      this.materialsToDispose.push(irisMat);
      const iris = new THREE.Mesh(irisGeo, irisMat);
      iris.position.set(x, y, 0.18);
      camGroup.add(iris);
    };

    // Strict triangular matrix layout:
    // Top-Left: Main Wide (48MP Fusion)
    createAppleLens(-0.42, 0.40, 0x0284c7);
    // Bottom-Left: Ultrawide (48MP)
    createAppleLens(-0.42, -0.42, 0x0d9488);
    // Top-Right: Telephoto (Tetraprism 5x)
    createAppleLens(0.38, 0.10, 0x38bdf8);

    // TrueTone LED Flash on the upper right margin
    const flashX = 0.40;
    const flashY = 0.62;
    const flashBezelGeo = new THREE.CylinderGeometry(0.18, 0.20, 0.07, 24);
    this.geometriesToDispose.push(flashBezelGeo);
    const flashBezelMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.2
    });
    this.materialsToDispose.push(flashBezelMat);
    const flashBezel = new THREE.Mesh(flashBezelGeo, flashBezelMat);
    flashBezel.rotation.x = Math.PI / 2;
    flashBezel.position.set(flashX, flashY, 0.08);
    camGroup.add(flashBezel);

    // Quad-LED dual-tone phosphor die
    const flashDieGeo = new THREE.BoxGeometry(0.15, 0.15, 0.02);
    this.geometriesToDispose.push(flashDieGeo);
    const flashDieMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: new THREE.Color(0xca8a04),
      emissiveIntensity: 0.35,
      roughness: 0.25
    });
    this.materialsToDispose.push(flashDieMat);
    const flashDie = new THREE.Mesh(flashDieGeo, flashDieMat);
    flashDie.position.set(flashX, flashY, 0.12);
    camGroup.add(flashDie);

    // Concentric Fresnel diffuser lens cover
    const diffuserGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 24);
    this.geometriesToDispose.push(diffuserGeo);
    const diffuserMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      roughness: 0.25
    });
    this.materialsToDispose.push(diffuserMat);
    const diffuser = new THREE.Mesh(diffuserGeo, diffuserMat);
    diffuser.rotation.x = Math.PI / 2;
    diffuser.position.set(flashX, flashY, 0.14);
    camGroup.add(diffuser);

    // LiDAR Scanner sensor on the bottom-right of the square bump
    const lidarX = 0.38;
    const lidarY = -0.42;
    const lidarBezelGeo = new THREE.CylinderGeometry(0.20, 0.22, 0.07, 24);
    this.geometriesToDispose.push(lidarBezelGeo);
    const lidarBezelMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.35
    });
    this.materialsToDispose.push(lidarBezelMat);
    const lidarBezel = new THREE.Mesh(lidarBezelGeo, lidarBezelMat);
    lidarBezel.rotation.x = Math.PI / 2;
    lidarBezel.position.set(lidarX, lidarY, 0.08);
    camGroup.add(lidarBezel);

    // Glossy optical window of the LiDAR sensor
    const lidarWindowGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.02, 24);
    this.geometriesToDispose.push(lidarWindowGeo);
    const lidarWindowMat = new THREE.MeshPhysicalMaterial({
      color: 0x09090b,
      metalness: 0.9,
      transmission: 0.15,
      reflectivity: 0.95,
      clearcoat: 1.0
    });
    this.materialsToDispose.push(lidarWindowMat);
    const lidarWindow = new THREE.Mesh(lidarWindowGeo, lidarWindowMat);
    lidarWindow.rotation.x = Math.PI / 2;
    lidarWindow.position.set(lidarX, lidarY, 0.12);
    camGroup.add(lidarWindow);

    // Micro VCSEL dot projector optical aperture
    const lidarDotGeo = new THREE.CircleGeometry(0.04, 16);
    this.geometriesToDispose.push(lidarDotGeo);
    const lidarDotMat = new THREE.MeshBasicMaterial({ color: 0x312e81 });
    this.materialsToDispose.push(lidarDotMat);
    const lidarDot = new THREE.Mesh(lidarDotGeo, lidarDotMat);
    lidarDot.position.set(lidarX, lidarY, 0.14);
    camGroup.add(lidarDot);

    // Laser-drilled rear microphone hole
    const micGeo = new THREE.CircleGeometry(0.035, 16);
    this.geometriesToDispose.push(micGeo);
    const micMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    this.materialsToDispose.push(micMat);
    const mic = new THREE.Mesh(micGeo, micMat);
    mic.position.set(0.42, -0.15, 0.07);
    camGroup.add(mic);

    return camGroup;
  }

  // 3. OnePlus 15: Authentic Centered Circular Matrix Layout
  private buildOnePlusCamera(part: ComponentPart): THREE.Group {
    const camGroup = new THREE.Group();

    // Large prominent circular camera housing precisely centered on the upper-third
    const housingRadius = 1.22;
    const housingDepth = 0.14;
    const housingGeo = new THREE.CylinderGeometry(housingRadius, housingRadius + 0.03, housingDepth, 48);
    this.geometriesToDispose.push(housingGeo);
    const housingMat = new THREE.MeshStandardMaterial({
      color: 0x0a1924,
      metalness: 0.88,
      roughness: 0.18
    });
    this.materialsToDispose.push(housingMat);
    const housing = new THREE.Mesh(housingGeo, housingMat);
    housing.rotation.x = Math.PI / 2;
    camGroup.add(housing);

    // Luxury watch knurled/fluted outer decorative bezel ring
    const bezelTorusGeo = new THREE.TorusGeometry(housingRadius + 0.01, 0.035, 16, 48);
    this.geometriesToDispose.push(bezelTorusGeo);
    const bezelTorusMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.95,
      roughness: 0.15
    });
    this.materialsToDispose.push(bezelTorusMat);
    const bezelTorus = new THREE.Mesh(bezelTorusGeo, bezelTorusMat);
    bezelTorus.position.z = 0.04;
    camGroup.add(bezelTorus);

    // Polished dark circular inner faceplate
    const faceplateGeo = new THREE.CylinderGeometry(housingRadius * 0.94, housingRadius * 0.94, 0.02, 48);
    this.geometriesToDispose.push(faceplateGeo);
    const faceplateMat = new THREE.MeshStandardMaterial({
      color: 0x040d14,
      metalness: 0.65,
      roughness: 0.22
    });
    this.materialsToDispose.push(faceplateMat);
    const faceplate = new THREE.Mesh(faceplateGeo, faceplateMat);
    faceplate.rotation.x = Math.PI / 2;
    faceplate.position.z = 0.07;
    camGroup.add(faceplate);

    // Helper for distinct lens rings inside circular housing
    const createOnePlusLens = (x: number, y: number, radius: number, lensColorHex: number, isPeriscope: boolean = false) => {
      // Outer bezel ring
      const ringGeo = new THREE.CylinderGeometry(radius, radius + 0.03, 0.13, 32);
      this.geometriesToDispose.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.92,
        roughness: 0.2
      });
      this.materialsToDispose.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(x, y, 0.09);
      camGroup.add(ringMesh);

      // Inner stepped baffle
      const baffleGeo = new THREE.CylinderGeometry(radius * 0.8, radius * 0.8, 0.05, 32);
      this.geometriesToDispose.push(baffleGeo);
      const baffleMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.8,
        roughness: 0.3
      });
      this.materialsToDispose.push(baffleMat);
      const baffle = new THREE.Mesh(baffleGeo, baffleMat);
      baffle.rotation.x = Math.PI / 2;
      baffle.position.set(x, y, 0.13);
      camGroup.add(baffle);

      // Sapphire lens element
      const glassGeo = new THREE.CylinderGeometry(radius * 0.74, radius * 0.74, 0.03, 32);
      this.geometriesToDispose.push(glassGeo);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(lensColorHex),
        transmission: 0.90,
        roughness: 0.04,
        reflectivity: 1.0,
        clearcoat: 1.0
      });
      this.materialsToDispose.push(glassMat);
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.rotation.x = Math.PI / 2;
      glassMesh.position.set(x, y, 0.16);
      camGroup.add(glassMesh);

      if (isPeriscope) {
        // Folded prism reflection highlight bar inside periscope
        const prismGeo = new THREE.BoxGeometry(radius * 0.8, 0.05, 0.02);
        this.geometriesToDispose.push(prismGeo);
        const prismMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });
        this.materialsToDispose.push(prismMat);
        const prism = new THREE.Mesh(prismGeo, prismMat);
        prism.position.set(x, y, 0.17);
        camGroup.add(prism);
      } else {
        // Optical iris core
        const irisGeo = new THREE.CircleGeometry(radius * 0.35, 16);
        this.geometriesToDispose.push(irisGeo);
        const irisMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
        this.materialsToDispose.push(irisMat);
        const iris = new THREE.Mesh(irisGeo, irisMat);
        iris.position.set(x, y, 0.17);
        camGroup.add(iris);
      }
    };

    // 3 distinct lens rings arranged symmetrically in triangle configuration:
    // 1. Top-Left: Main 50MP Sony LYT-900 1-inch sensor
    createOnePlusLens(-0.48, 0.42, 0.32, 0x06b6d4);
    // 2. Top-Right: Ultrawide 50MP Sony LYT-600
    createOnePlusLens(0.48, 0.42, 0.32, 0x10b981);
    // 3. Bottom: Periscope Telephoto 64MP OV64B
    createOnePlusLens(0.00, -0.48, 0.34, 0x38bdf8, true);

    // Central LED flash dot: positioned precisely in the center
    const flashCenterX = 0.00;
    const flashCenterY = 0.05;
    const flashBezelGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.08, 24);
    this.geometriesToDispose.push(flashBezelGeo);
    const flashBezelMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2
    });
    this.materialsToDispose.push(flashBezelMat);
    const flashBezel = new THREE.Mesh(flashBezelGeo, flashBezelMat);
    flashBezel.rotation.x = Math.PI / 2;
    flashBezel.position.set(flashCenterX, flashCenterY, 0.09);
    camGroup.add(flashBezel);

    // Dual-tone LED phosphor die
    const flashDieGeo = new THREE.BoxGeometry(0.12, 0.12, 0.02);
    this.geometriesToDispose.push(flashDieGeo);
    const flashDieMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: new THREE.Color(0xca8a04),
      emissiveIntensity: 0.35,
      roughness: 0.25
    });
    this.materialsToDispose.push(flashDieMat);
    const flashDie = new THREE.Mesh(flashDieGeo, flashDieMat);
    flashDie.position.set(flashCenterX, flashCenterY, 0.13);
    camGroup.add(flashDie);

    // Clear Fresnel diffuser lens cover
    const diffuserGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.02, 24);
    this.geometriesToDispose.push(diffuserGeo);
    const diffuserMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      roughness: 0.2
    });
    this.materialsToDispose.push(diffuserMat);
    const diffuser = new THREE.Mesh(diffuserGeo, diffuserMat);
    diffuser.rotation.x = Math.PI / 2;
    diffuser.position.set(flashCenterX, flashCenterY, 0.15);
    camGroup.add(diffuser);

    // Hasselblad 13-channel multi-spectral color sensor / emblem accent
    const colorSensorGeo = new THREE.CircleGeometry(0.06, 16);
    this.geometriesToDispose.push(colorSensorGeo);
    const colorSensorMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    this.materialsToDispose.push(colorSensorMat);
    const colorSensor = new THREE.Mesh(colorSensorGeo, colorSensorMat);
    colorSensor.position.set(0.00, 0.70, 0.08);
    camGroup.add(colorSensor);

    return camGroup;
  }

  // Clean memory leaks
  public dispose() {
    this.geometriesToDispose.forEach((g) => g.dispose());
    this.materialsToDispose.forEach((m) => m.dispose());
    this.texturesToDispose.forEach((t) => t.dispose());
  }
}

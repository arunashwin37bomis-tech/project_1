/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ComponentCategory = 
  | 'processor'
  | 'connectivity'
  | 'battery'
  | 'display'
  | 'motherboard'
  | 'memory'
  | 'camera'
  | 'sensors'
  | 'audio_haptics'
  | 'cooling'
  | 'chassis';

export interface MaterialComposition {
  name: string;
  chemicalSymbol?: string;
  percentage: string;
  purpose: string;
  rarity?: 'common' | 'precious' | 'critical' | 'rare_earth';
  colorHex?: string;
}

export interface ComponentPart {
  id: string;
  name: string;
  codeName: string;
  category: ComponentCategory;
  layerZ: number; // base explosion offset multiplier along Z
  layerGroup: 'front' | 'display' | 'chassis' | 'cooling' | 'motherboard' | 'chips' | 'battery' | 'cameras' | 'back';
  functionSummary: string;
  detailedArchitecture: string;
  materials: MaterialComposition[];
  specs: Record<string, string>;
  keyInnovations: string[];
  meshType: 
    | 'soc'
    | 'modem'
    | 'battery'
    | 'display_panel'
    | 'motherboard'
    | 'memory_chips'
    | 'camera_module'
    | 'sensors_cluster'
    | 'audio_taptic'
    | 'vapor_chamber'
    | 'chassis_frame'
    | 'back_glass';
  position: [number, number, number];
  dimensions: [number, number, number]; // width, height, depth
  colorHex: string;
  roughness: number;
  metalness: number;
  opacity?: number;
  highlightColor: string;
}

export interface PhoneModel {
  id: string;
  name: string;
  marketingName: string;
  brand: 'Samsung' | 'Apple' | 'OnePlus' | 'Google';
  year: number;
  tagline: string;
  frameColor: string;
  backColor: string;
  accentColor: string;
  screenSize: string;
  weightGrams: number;
  thicknessMm: number;
  ipRating: string;
  keySpecs: {
    soc: string;
    processNode: string;
    ram: string;
    storage: string;
    battery: string;
    charging: string;
    display: string;
    mainCamera: string;
    telephotoCamera: string;
    cooling: string;
    materials: string;
  };
  sustainabilityScore: number;
  recycledMaterialsPercent: number;
  glbUrl?: string;
  components: ComponentPart[];
}

export type ViewMode = 'realistic' | 'xray' | 'thermal' | 'wireframe';
export type ThemeMode = 'dark' | 'light';

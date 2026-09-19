/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ComponentPart, 
  ComponentCategory, 
  PhoneModel,
  ThemeMode 
} from '../types';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Wifi, 
  BatteryCharging, 
  Tv, 
  CircuitBoard, 
  HardDrive, 
  Camera, 
  Compass, 
  Volume2, 
  Thermometer, 
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ComponentListSidebarProps {
  model: PhoneModel;
  selectedComponent: ComponentPart | null;
  onSelectComponent: (component: ComponentPart | null) => void;
  hoveredComponent: ComponentPart | null;
  onHoverComponent: (component: ComponentPart | null) => void;
  theme: ThemeMode;
}

const CATEGORY_ICONS: Record<ComponentCategory, React.ComponentType<{ className?: string }>> = {
  processor: Cpu,
  connectivity: Wifi,
  battery: BatteryCharging,
  display: Tv,
  motherboard: CircuitBoard,
  memory: HardDrive,
  camera: Camera,
  sensors: Compass,
  audio_haptics: Volume2,
  cooling: Thermometer,
  chassis: ShieldCheck
};

export const ComponentListSidebar: React.FC<ComponentListSidebarProps> = ({
  model,
  selectedComponent,
  onSelectComponent,
  hoveredComponent,
  onHoverComponent,
  theme
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const isDark = theme === 'dark';

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Modules' },
    { id: 'processor', label: 'SoC / CPU' },
    { id: 'camera', label: 'Optics' },
    { id: 'battery', label: 'Power Cell' },
    { id: 'cooling', label: 'Thermals' },
    { id: 'display', label: 'Display' },
    { id: 'motherboard', label: 'Logic Board' },
    { id: 'connectivity', label: '5G Modem' },
    { id: 'audio_haptics', label: 'Haptics & Sound' },
    { id: 'sensors', label: 'Biometrics & Sensors' }
  ];

  const filteredComponents = model.components.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.codeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.materials.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      {/* Collapse/Expand Toggle Button on Left */}
      <button
        onClick={() => {
          soundManager.playHover();
          setIsOpen(!isOpen);
        }}
        className={`absolute top-20 sm:top-24 z-20 p-2 rounded-r-lg border-l-0 transition-all duration-300 shadow-lg ${
          isDark
            ? 'cyber-panel border-cyan-500/40 text-cyan-400 hover:text-white'
            : 'bg-white border border-slate-200 text-slate-700 hover:text-cyan-700 shadow-slate-200'
        } ${
          isOpen ? 'left-80 sm:left-88' : 'left-0'
        }`}
        title={isOpen ? 'Collapse Directory' : 'Expand Component Directory'}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Sidebar Drawer */}
      <aside
        className={`absolute top-20 sm:top-24 bottom-24 left-3 sm:left-4 z-20 w-76 sm:w-84 rounded-xl flex flex-col transition-all duration-300 pointer-events-auto border overflow-hidden shadow-2xl backdrop-blur-md ${
          isDark
            ? 'cyber-panel border-cyan-500/30 bg-[#070c18]/90 shadow-black/70'
            : 'border-slate-200/90 bg-white/95 shadow-slate-300/60'
        } ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-[110%] opacity-0 pointer-events-none'
        }`}
      >
        {/* Header with quick stats */}
        <div className={`p-3.5 border-b ${isDark ? 'border-slate-800 bg-[#070c18]/80' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              <h2 className={`text-xs font-bold uppercase tracking-wider font-tech ${isDark ? 'text-white' : 'text-slate-900'}`}>
                HARDWARE STACK
              </h2>
            </div>
            <span
              className={`text-[11px] font-mono-tech px-1.5 py-0.5 rounded border ${
                isDark
                  ? 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30'
                  : 'text-cyan-700 bg-cyan-50 border-cyan-300 font-bold'
              }`}
            >
              {model.components.length} UNITS
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-2.5 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search chip, sensor, alloy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg font-mono-tech focus:outline-none border transition-colors ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-cyan-400'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500'
              }`}
            />
          </div>

          {/* Category Badges Filter (Horizontal Scroll) */}
          <div className="flex items-center space-x-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playHover();
                  setSelectedCategory(cat.id);
                }}
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono-tech whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? isDark
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                      : 'bg-cyan-50 text-cyan-800 border-cyan-400 font-bold'
                    : isDark
                    ? 'bg-slate-900/60 text-slate-400 hover:text-slate-300 border-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Component List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filteredComponents.map((component) => {
            const isSelected = selectedComponent?.id === component.id;
            const isHovered = hoveredComponent?.id === component.id;
            const IconComponent = CATEGORY_ICONS[component.category] || Cpu;

            return (
              <div
                key={component.id}
                onClick={() => {
                  soundManager.playSelect();
                  onSelectComponent(isSelected ? null : component);
                }}
                onMouseEnter={() => {
                  onHoverComponent(component);
                }}
                onMouseLeave={() => {
                  if (hoveredComponent?.id === component.id) onHoverComponent(null);
                }}
                className={`group relative p-2.5 rounded-lg cursor-pointer transition-all border ${
                  isSelected
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-950/70 to-blue-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-cyan-50/90 border-cyan-400 shadow-sm text-slate-900 font-semibold'
                    : isHovered
                    ? isDark
                      ? 'bg-slate-800/60 border-cyan-500/40 text-slate-200'
                      : 'bg-slate-100 border-slate-300 text-slate-900'
                    : isDark
                    ? 'bg-slate-900/40 hover:bg-slate-800/40 border-slate-800/80 text-slate-300'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {/* Left accent indicator bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-all ${
                    isSelected ? 'bg-cyan-400' : 'bg-transparent group-hover:bg-cyan-500/40'
                  }`}
                  style={isSelected ? { backgroundColor: component.highlightColor } : undefined}
                />

                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2.5">
                    <div
                      className={`p-1.5 rounded border transition-colors ${
                        isSelected
                          ? isDark ? 'border-cyan-400/60 text-cyan-300 bg-cyan-950/80' : 'border-cyan-400 text-cyan-700 bg-cyan-50'
                          : isDark ? 'text-cyan-400 bg-slate-950/80 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col">
                      <span
                        className={`text-xs font-bold font-tech tracking-wide transition-colors ${
                          isSelected
                            ? isDark ? 'text-cyan-300 font-bold' : 'text-cyan-900 font-bold'
                            : isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-700'
                        }`}
                      >
                        {component.name}
                      </span>
                      <span className={`text-[10px] font-mono-tech line-clamp-1 ${isDark ? 'text-cyan-400/80' : 'text-cyan-600'}`}>
                        {component.codeName}
                      </span>
                    </div>
                  </div>

                  {/* Layer depth tag */}
                  <span
                    className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border ${
                      isDark
                        ? 'bg-slate-950/60 text-slate-400 border-slate-800'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    L{Math.abs(Math.round(component.layerZ * 10))}
                  </span>
                </div>

                {/* Primary Raw Material Badge */}
                <div className={`mt-2 flex items-center space-x-1 text-[10px] font-mono-tech ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="truncate">
                    {component.materials[0]?.name} ({component.materials[0]?.percentage})
                  </span>
                </div>
              </div>
            );
          })}

          {filteredComponents.length === 0 && (
            <div className={`text-center py-8 text-xs font-mono-tech ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              No components matching search criteria
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div
          className={`p-2 border-t flex items-center justify-between text-[10px] font-mono-tech ${
            isDark ? 'border-slate-800 bg-[#070c18]/80 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          <span>Click to focus in 3D</span>
          <span className="text-cyan-500 font-semibold">Raycast Target Active</span>
        </div>
      </aside>
    </>
  );
};

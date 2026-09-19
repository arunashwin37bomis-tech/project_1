/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Eye, 
  Flame, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { ViewMode, ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface ExplodedControlsProps {
  explodedProgress: number;
  onExplodedChange: (progress: number) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  onResetExplode: () => void;
  theme: ThemeMode;
}

export const ExplodedControls: React.FC<ExplodedControlsProps> = ({
  explodedProgress,
  onExplodedChange,
  autoRotate,
  onToggleAutoRotate,
  viewMode,
  onSelectViewMode,
  onResetExplode,
  theme
}) => {
  const percent = Math.round(explodedProgress * 100);
  const isDark = theme === 'dark';
  const isThermal = viewMode === 'thermal';

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-[95%] max-w-3xl pointer-events-auto">
      <div
        className={`p-3 sm:p-4 rounded-xl border backdrop-blur-md transition-colors duration-300 shadow-2xl ${
          isDark
            ? 'cyber-panel border-cyan-500/30 bg-[#080e1a]/90 shadow-cyan-950/40 text-slate-200'
            : 'border-slate-200/90 bg-white/95 shadow-slate-300/60 text-slate-800'
        }`}
      >
        {/* Mobile View Mode Switcher */}
        <div className={`flex md:hidden items-center justify-between pb-2 mb-2 border-b text-xs ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <span className={`text-[10px] font-mono-tech uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Shader Mode:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onSelectViewMode('realistic')}
              className={`p-1.5 rounded ${viewMode === 'realistic' ? (isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-50 text-cyan-700 font-bold') : isDark ? 'text-slate-400' : 'text-slate-500'}`}
              title="Realistic"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectViewMode('xray')}
              className={`p-1.5 rounded ${viewMode === 'xray' ? (isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-50 text-cyan-700 font-bold') : isDark ? 'text-slate-400' : 'text-slate-500'}`}
              title="X-Ray"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectViewMode(isThermal ? 'realistic' : 'thermal')}
              className={`p-1.5 rounded ${isThermal ? (isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-700 font-bold') : isDark ? 'text-slate-400' : 'text-slate-500'}`}
              title="Thermal Simulation"
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
            </button>
            <button
              onClick={() => onSelectViewMode('wireframe')}
              className={`p-1.5 rounded ${viewMode === 'wireframe' ? (isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-50 text-cyan-700 font-bold') : isDark ? 'text-slate-400' : 'text-slate-500'}`}
              title="Wireframe"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Exploded Slider & Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Label and Percentage */}
          <div className="flex items-center justify-between w-full lg:w-auto space-x-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-500" />
              <span className={`text-xs font-bold uppercase tracking-wider font-tech ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                EXPLODED SEPARATION
              </span>
            </div>
            <span
              className={`text-xs font-mono-tech font-bold px-2 py-0.5 rounded border min-w-[50px] text-center ${
                isDark
                  ? 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30'
                  : 'text-cyan-700 bg-cyan-50 border-cyan-300'
              }`}
            >
              {percent}%
            </span>
          </div>

          {/* Interactive Range Slider */}
          <div className="relative flex-1 w-full flex items-center px-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedProgress}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onExplodedChange(val);
                if (Math.abs(val - explodedProgress) > 0.1) {
                  soundManager.playExplode();
                }
              }}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                isDark ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            />
          </div>

          {/* Action Buttons: Assemble, Disassemble, Thermal Mode & Auto-Rotate */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 w-full lg:w-auto justify-end">
            {/* Assemble (0%) */}
            <button
              id="assemble-btn"
              data-state={percent === 0 ? 'assembled' : 'active'}
              onClick={() => {
                soundManager.playSelect();
                const nextVal = percent === 0 ? 1 : 0;
                onExplodedChange(nextVal);
              }}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all border ${
                percent === 0
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm font-bold'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-400 shadow-sm font-bold'
                  : isDark
                  ? 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
              title="Assemble Phone Components (0%)"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>ASSEMBLE</span>
            </button>

            {/* Disassemble (100%) */}
            <button
              id="disassemble-btn"
              data-state={percent === 100 ? 'disassembled' : 'active'}
              onClick={() => {
                soundManager.playExplode();
                const nextVal = percent === 100 ? 0 : 1;
                onExplodedChange(nextVal);
              }}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all border ${
                percent === 100
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm font-bold'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-400 shadow-sm font-bold'
                  : isDark
                  ? 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
              title="Disassemble / Exploded Teardown (100%)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>DISASSEMBLE</span>
            </button>

            {/* Dedicated Thermal Mode Button */}
            <button
              onClick={() => {
                soundManager.playModeSwitch();
                onSelectViewMode(isThermal ? 'realistic' : 'thermal');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all border font-bold ${
                isThermal
                  ? isDark
                    ? 'bg-red-500/25 text-red-300 border-red-500 shadow-lg shadow-red-950/40 animate-pulse'
                    : 'bg-red-50 text-red-700 border-red-400 shadow-md shadow-red-200 animate-pulse'
                  : isDark
                  ? 'bg-red-950/20 text-red-400 hover:text-red-300 border-red-500/30 hover:bg-red-950/40'
                  : 'bg-white text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 shadow-sm'
              }`}
              title="Toggle Dynamic Thermal Heat Dissipation Simulation"
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>THERMAL MODE</span>
            </button>

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => {
                soundManager.playHover();
                onToggleAutoRotate();
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                autoRotate
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-400'
                  : isDark
                  ? 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
              title={autoRotate ? 'Pause 3D Rotation' : 'Auto Rotate Model'}
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

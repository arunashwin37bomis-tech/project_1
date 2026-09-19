/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { PhoneModel, ViewMode, ThemeMode } from '../types';
import { 
  Eye, 
  Flame, 
  Cpu, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Layers, 
  Atom,
  Sparkles,
  Smartphone,
  Sun,
  Moon,
  Upload,
  Box,
  X
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  phones: PhoneModel[];
  currentPhone: PhoneModel;
  onSelectPhone: (phone: PhoneModel) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetCamera: () => void;
  onOpenAnalytics: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onImportGlbFile?: (file: File) => void;
  onClearGlb?: () => void;
  isGlbActive?: boolean;
  glbFileName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  phones,
  currentPhone,
  onSelectPhone,
  viewMode,
  onSelectViewMode,
  soundEnabled,
  onToggleSound,
  onResetCamera,
  onOpenAnalytics,
  theme,
  onToggleTheme,
  onImportGlbFile,
  onClearGlb,
  isGlbActive = false,
  glbFileName = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === 'dark';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      soundManager.playSelect();
      onImportGlbFile?.(file);
      // Reset input value so same file can be reselected if needed
      e.target.value = '';
    }
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-20 pointer-events-auto p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-b from-[#05070d]/95 via-[#05070d]/80 to-transparent'
          : 'bg-gradient-to-b from-white/95 via-white/85 to-transparent border-b border-slate-200/60 shadow-sm'
      }`}
    >
      {/* Brand & App Title */}
      <div className="flex items-center justify-between md:justify-start space-x-3">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center border shadow-md ${
              isDark
                ? 'cyber-panel border-cyan-500/40 text-cyan-400 shadow-cyan-500/20'
                : 'bg-white border-cyan-500/30 text-cyan-600 shadow-slate-200'
            }`}
          >
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1
                className={`text-base sm:text-lg font-bold tracking-wider uppercase font-tech ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                HARDWARE <span className="text-cyan-500">DISSECT</span> 3D
              </h1>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase border ${
                  isDark
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30'
                    : 'bg-cyan-50 text-cyan-700 border-cyan-300'
                }`}
              >
                v2026.4
              </span>
            </div>
            <p className={`text-[11px] hidden sm:block font-mono-tech ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Interactive 3D Teardown • Silicon, Optics & Materials Matrix
            </p>
          </div>
        </div>

        {/* Mobile quick actions */}
        <div className="flex items-center space-x-1 md:hidden">
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`p-2 rounded border transition-colors ${
              isDark
                ? 'bg-slate-900/80 text-cyan-400 border-slate-800'
                : 'bg-white text-cyan-600 border-slate-200 shadow-sm'
            }`}
            title="Import .GLB 3D Asset"
          >
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              soundManager.playSelect();
              onToggleTheme();
            }}
            className={`p-2 rounded border transition-colors ${
              isDark
                ? 'bg-slate-900/80 text-amber-300 border-slate-800'
                : 'bg-white text-amber-600 border-slate-200 shadow-sm'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onToggleSound}
            className={`p-2 rounded border ${
              isDark
                ? 'bg-slate-900/80 text-slate-400 hover:text-cyan-400 border-slate-800'
                : 'bg-white text-slate-600 hover:text-cyan-600 border-slate-200'
            }`}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-500" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onResetCamera}
            className={`p-2 rounded border ${
              isDark
                ? 'bg-slate-900/80 text-slate-400 hover:text-cyan-400 border-slate-800'
                : 'bg-white text-slate-600 hover:text-cyan-600 border-slate-200'
            }`}
            title="Reset Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flagship Device Selector Tabs */}
      <div
        className={`flex items-center p-1 rounded-xl border overflow-x-auto scrollbar-none shadow-lg ${
          isDark
            ? 'bg-[#0a101f]/90 border-cyan-500/30'
            : 'bg-white/95 border-slate-200/90 shadow-slate-200/60'
        }`}
      >
        {phones.map((phone) => {
          const isSelected = phone.id === currentPhone.id;
          return (
            <button
              key={phone.id}
              onClick={() => {
                if (!isSelected) {
                  soundManager.playSelect();
                  onSelectPhone(phone);
                }
              }}
              className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap font-tech ${
                isSelected
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-white border border-cyan-400/60 shadow-md shadow-cyan-500/20'
                    : 'bg-cyan-50 text-cyan-900 border border-cyan-400 shadow-sm font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Smartphone className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <span>{phone.name}</span>
              {isSelected && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: phone.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* View Mode Switcher & Tools */}
      <div className="hidden md:flex items-center space-x-2">
        {/* Render Modes */}
        <div
          className={`flex items-center p-1 rounded-lg border ${
            isDark ? 'bg-[#0a101f]/80 border-slate-800' : 'bg-slate-100/90 border-slate-200'
          }`}
        >
          <button
            onClick={() => {
              soundManager.playModeSwitch();
              onSelectViewMode('realistic');
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono-tech transition-all ${
              viewMode === 'realistic'
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-white text-cyan-800 border border-cyan-400 shadow-sm font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Realistic Material Shader"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>REAL</span>
          </button>

          <button
            onClick={() => {
              soundManager.playModeSwitch();
              onSelectViewMode('xray');
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono-tech transition-all ${
              viewMode === 'xray'
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-white text-cyan-800 border border-cyan-400 shadow-sm font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="X-Ray Internal Translucent View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>X-RAY</span>
          </button>

          <button
            onClick={() => {
              soundManager.playModeSwitch();
              onSelectViewMode('thermal');
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono-tech transition-all ${
              viewMode === 'thermal'
                ? isDark
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm font-bold'
                  : 'bg-red-50 text-red-700 border border-red-400 shadow-sm font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Thermal Infrared Dissipation Heatmap"
          >
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>THERMAL</span>
          </button>

          <button
            onClick={() => {
              soundManager.playModeSwitch();
              onSelectViewMode('wireframe');
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded text-xs font-mono-tech transition-all ${
              viewMode === 'wireframe'
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-white text-cyan-800 border border-cyan-400 shadow-sm font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Cyber Blueprint Wireframe"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WIRE</span>
          </button>
        </div>

        {/* Hidden GLB File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb,.gltf"
          onChange={handleFileChange}
          className="hidden"
          id="glb-file-input"
        />

        {/* GLB File Import Button / Active Status Badge */}
        {isGlbActive ? (
          <div
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono-tech ${
              isDark
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                : 'bg-cyan-50 border-cyan-300 text-cyan-800'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="max-w-[110px] truncate" title={glbFileName}>
              {glbFileName || 'GLB Model'}
            </span>
            {onClearGlb && (
              <button
                onClick={() => {
                  soundManager.playSelect();
                  onClearGlb();
                }}
                title="Switch back to Procedural CAD Model"
                className="hover:text-red-400 p-0.5 rounded transition-colors ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-tech transition-all border shadow-sm ${
              isDark
                ? 'cyber-panel text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/40 hover:border-cyan-400'
                : 'bg-white text-cyan-800 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 shadow-slate-200'
            }`}
            title="Import downloaded .glb 3D phone model file"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-500" />
            <span>IMPORT GLB</span>
          </button>
        )}

        {/* Materials Analytics Modal Trigger */}
        <button
          onClick={() => {
            soundManager.playSelect();
            onOpenAnalytics();
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-tech transition-all shadow-md ${
            isDark
              ? 'cyber-panel text-amber-300 border border-amber-500/40 hover:bg-amber-950/30 shadow-amber-500/10'
              : 'bg-white text-amber-700 border border-amber-300 hover:bg-amber-50 shadow-slate-200'
          }`}
          title="Inspect Raw Materials & Elements"
        >
          <Atom className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>ELEMENTS</span>
        </button>

        {/* Theme Toggle Button (Light/Dark Mode) */}
        <button
          onClick={() => {
            soundManager.playSelect();
            onToggleTheme();
          }}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-tech transition-all border shadow-sm ${
            isDark
              ? 'bg-[#0a101f]/80 text-amber-300 border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/60'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400/50 hover:bg-amber-50/50'
          }`}
          title={isDark ? 'Switch to Light Studio Mode' : 'Switch to Dark Cyberpunk Mode'}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="font-mono-tech text-[11px] font-bold">LIGHT</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span className="font-mono-tech text-[11px] font-bold">DARK</span>
            </>
          )}
        </button>

        {/* Reset Camera */}
        <button
          onClick={() => {
            soundManager.playHover();
            onResetCamera();
          }}
          className={`p-2 rounded-lg transition-all border ${
            isDark
              ? 'cyber-panel text-slate-400 hover:text-cyan-300 border-slate-800 hover:border-cyan-500/40'
              : 'bg-white text-slate-600 hover:text-cyan-700 border-slate-200 hover:border-cyan-400 shadow-sm'
          }`}
          title="Reset Camera Angle"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg border transition-all ${
            soundEnabled
              ? isDark
                ? 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20'
                : 'text-cyan-700 border-cyan-400 bg-cyan-50'
              : isDark
              ? 'text-slate-500 border-slate-800'
              : 'text-slate-400 border-slate-200 bg-white'
          }`}
          title={soundEnabled ? 'Mute Sound Effects' : 'Enable Audio Feedback'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};

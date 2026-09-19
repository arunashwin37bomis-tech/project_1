/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ComponentPart, ThemeMode } from '../types';
import { 
  X, 
  Cpu, 
  Atom, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Microscope,
  Info
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ComponentDossierProps {
  component: ComponentPart | null;
  onClose: () => void;
  onOpenAnalytics: () => void;
  theme: ThemeMode;
}

export const ComponentDossier: React.FC<ComponentDossierProps> = ({
  component,
  onClose,
  onOpenAnalytics,
  theme
}) => {
  if (!component) return null;
  const isDark = theme === 'dark';

  return (
    <div
      className={`absolute top-20 sm:top-24 bottom-24 right-3 sm:right-4 z-20 w-84 sm:w-96 rounded-xl flex flex-col pointer-events-auto border overflow-hidden backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200 ${
        isDark
          ? 'cyber-panel border-cyan-500/40 bg-[#070c18]/90 text-slate-300 shadow-black/80'
          : 'border-slate-200/90 bg-white/95 text-slate-700 shadow-slate-300/60'
      }`}
    >
      {/* Top Title Bar */}
      <div className={`p-3.5 border-b flex items-start justify-between ${isDark ? 'border-slate-800 bg-[#070c18]/90' : 'border-slate-200 bg-slate-50'}`}>
        <div className="flex items-start space-x-2.5">
          <div
            className={`p-2 rounded-lg border shadow-md ${
              isDark ? 'bg-slate-950/80 text-cyan-400' : 'bg-white text-cyan-700'
            }`}
            style={{ borderColor: `${component.highlightColor}60` }}
          >
            <Microscope className="w-5 h-5" style={{ color: component.highlightColor }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-mono-tech uppercase font-bold tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                HARDWARE DOSSIER
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono-tech ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700 font-semibold'
                }`}
              >
                {component.category.toUpperCase()}
              </span>
            </div>
            <h2 className={`text-sm sm:text-base font-bold font-tech tracking-wide uppercase mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {component.name}
            </h2>
            <p className={`text-[11px] font-mono-tech font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
              {component.codeName}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playHover();
            onClose();
          }}
          className={`p-1 rounded transition-colors ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Close Dossier"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Function Overview */}
        <section
          className={`p-3 rounded-lg border ${
            isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className={`flex items-center space-x-1.5 text-xs font-bold font-tech uppercase mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            <span>FUNCTION & PURPOSE</span>
          </div>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {component.functionSummary}
          </p>
        </section>

        {/* Detailed Architecture */}
        <section>
          <div className={`flex items-center space-x-1.5 text-xs font-bold font-tech uppercase mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            <span>INTERNAL ARCHITECTURE & MECHANICS</span>
          </div>
          <p
            className={`leading-relaxed p-3 rounded-lg border font-mono-tech text-[11px] ${
              isDark ? 'bg-slate-900/40 text-slate-400 border-slate-800/60' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {component.detailedArchitecture}
          </p>
        </section>

        {/* Exact Metals & Raw Material Composition */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className={`flex items-center space-x-1.5 text-xs font-bold font-tech uppercase ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
              <Atom className="w-3.5 h-3.5 text-amber-500" />
              <span>METALS & MATERIAL COMPOSITION</span>
            </div>
            <button
              onClick={() => {
                soundManager.playSelect();
                onOpenAnalytics();
              }}
              className={`text-[10px] font-mono-tech underline ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-800'}`}
            >
              Periodic Matrix →
            </button>
          </div>

          <div className="space-y-2">
            {component.materials.map((mat, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800/80 hover:border-cyan-500/30'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: mat.colorHex || '#38bdf8' }}
                    />
                    <span className={`font-semibold font-tech ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {mat.name}
                    </span>
                    {mat.chemicalSymbol && (
                      <span
                        className={`text-[10px] px-1 py-0.2 rounded font-mono-tech ${
                          isDark ? 'bg-slate-800 text-amber-300' : 'bg-amber-100 text-amber-800 font-bold'
                        }`}
                      >
                        {mat.chemicalSymbol}
                      </span>
                    )}
                  </div>
                  <span className={`font-mono-tech font-bold text-xs ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                    {mat.percentage}
                  </span>
                </div>

                {/* Progress bar */}
                <div className={`w-full rounded-full h-1.5 overflow-hidden mb-1.5 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: mat.percentage,
                      backgroundColor: mat.colorHex || '#38bdf8'
                    }}
                  />
                </div>

                <p className={`text-[10px] italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {mat.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Micro-Specifications Grid */}
        <section>
          <div className={`flex items-center space-x-1.5 text-xs font-bold font-tech uppercase mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <Info className="w-3.5 h-3.5 text-cyan-500" />
            <span>MICRO-SPECIFICATIONS</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 text-xs font-mono-tech">
            {Object.entries(component.specs).map(([key, val]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-2 rounded border ${
                  isDark ? 'bg-slate-900/60 border-slate-800/70' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{key}</span>
                <span className={`font-semibold text-[11px] text-right ml-2 ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Hardware Innovations */}
        <section>
          <div className={`flex items-center space-x-1.5 text-xs font-bold font-tech uppercase mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>KEY HARDWARE ADVANCEMENTS</span>
          </div>
          <ul className="space-y-1.5">
            {component.keyInnovations.map((innov, i) => (
              <li key={i} className={`flex items-start space-x-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{innov}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer Status */}
      <div
        className={`p-3 border-t flex items-center justify-between text-xs font-mono-tech ${
          isDark ? 'border-slate-800 bg-[#070c18]/90 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}
      >
        <div className="flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-500" />
          <span>Layer: {component.layerGroup.toUpperCase()}</span>
        </div>
        <button
          onClick={() => {
            soundManager.playSelect();
            onOpenAnalytics();
          }}
          className={`px-2.5 py-1 rounded border transition-colors ${
            isDark
              ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/60'
              : 'bg-cyan-50 text-cyan-800 border-cyan-400 hover:bg-cyan-100 font-bold'
          }`}
        >
          Inspect Matrix
        </button>
      </div>
    </div>
  );
};

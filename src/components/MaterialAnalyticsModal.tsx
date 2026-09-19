/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhoneModel } from '../types';
import { 
  X, 
  Atom, 
  Sparkles, 
  Layers, 
  Recycle, 
  Award, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MaterialAnalyticsModalProps {
  model: PhoneModel;
  isOpen: boolean;
  onClose: () => void;
}

export const MaterialAnalyticsModal: React.FC<MaterialAnalyticsModalProps> = ({
  model,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  // Aggregate all unique materials across all components of the model
  const materialMap = new Map<string, {
    name: string;
    chemicalSymbol?: string;
    rarity?: string;
    purposes: string[];
    colorHex: string;
  }>();

  model.components.forEach(comp => {
    comp.materials.forEach(mat => {
      const existing = materialMap.get(mat.name);
      if (existing) {
        existing.purposes.push(`${comp.name}: ${mat.purpose}`);
      } else {
        materialMap.set(mat.name, {
          name: mat.name,
          chemicalSymbol: mat.chemicalSymbol,
          rarity: mat.rarity || 'critical',
          purposes: [`${comp.name}: ${mat.purpose}`],
          colorHex: mat.colorHex || '#38bdf8'
        });
      }
    });
  });

  const materialsList = Array.from(materialMap.values());

  const rareEarthCount = materialsList.filter(m => m.rarity === 'rare_earth').length;
  const preciousCount = materialsList.filter(m => m.rarity === 'precious').length;
  const criticalCount = materialsList.filter(m => m.rarity === 'critical').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] cyber-panel rounded-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden bg-[#070c18]/95">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0a1224]/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl cyber-panel flex items-center justify-center border border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/10">
              <Atom className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono-tech uppercase text-amber-400 font-bold tracking-wider">
                  METALLURGY & ELEMENTAL AUDIT
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  {model.name}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white font-tech uppercase tracking-wide">
                Raw Materials, Metals & Chemical Elements
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playHover();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 sm:p-5 border-b border-slate-800/80 bg-[#080e1c]/60">
          <div className="cyber-panel p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-tech font-bold uppercase mb-1">
              <Recycle className="w-4 h-4" />
              <span>RECYCLED RATIO</span>
            </div>
            <div className="text-2xl font-bold font-mono-tech text-white">
              {model.recycledMaterialsPercent}%
            </div>
            <p className="text-[10px] text-slate-400 font-mono-tech mt-0.5">
              Certified recycled gold, tungsten & cobalt
            </p>
          </div>

          <div className="cyber-panel p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20">
            <div className="flex items-center space-x-1.5 text-xs text-cyan-400 font-tech font-bold uppercase mb-1">
              <Award className="w-4 h-4" />
              <span>CIRCULAR SCORE</span>
            </div>
            <div className="text-2xl font-bold font-mono-tech text-white">
              {model.sustainabilityScore}/100
            </div>
            <p className="text-[10px] text-slate-400 font-mono-tech mt-0.5">
              Repairability & Disassembly Index
            </p>
          </div>

          <div className="cyber-panel p-3 rounded-xl border border-amber-500/30 bg-amber-950/20">
            <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-tech font-bold uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>RARE EARTHS</span>
            </div>
            <div className="text-2xl font-bold font-mono-tech text-white">
              {rareEarthCount} Elements
            </div>
            <p className="text-[10px] text-slate-400 font-mono-tech mt-0.5">
              Neodymium NdFeB, Dysprosium & Cobalt
            </p>
          </div>

          <div className="cyber-panel p-3 rounded-xl border border-purple-500/30 bg-purple-950/20">
            <div className="flex items-center space-x-1.5 text-xs text-purple-400 font-tech font-bold uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>CHASSIS ALLOY</span>
            </div>
            <div className="text-lg font-bold font-mono-tech text-white truncate">
              {model.keySpecs.materials.split(',')[0]}
            </div>
            <p className="text-[10px] text-slate-400 font-mono-tech mt-0.5">
              Structural aerospace grade integrity
            </p>
          </div>
        </div>

        {/* Scrollable Elements Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider mb-2">
            DETAILED ELEMENTAL & COMPOUND BREAKDOWN ({materialsList.length} IDENTIFIED MATERIALS)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {materialsList.map((item, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl cyber-panel border border-slate-800 hover:border-cyan-500/40 transition-all bg-[#09101f]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full ring-2 ring-slate-800"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white font-tech">
                          {item.name}
                        </h4>
                        {item.chemicalSymbol && (
                          <span className="text-[10px] font-mono-tech font-bold text-amber-300">
                            {item.chemicalSymbol}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-mono-tech px-2 py-0.5 rounded font-bold uppercase border ${
                        item.rarity === 'rare_earth'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          : item.rarity === 'precious'
                          ? 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40'
                          : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      {item.rarity ? item.rarity.replace('_', ' ') : 'CRITICAL'}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    {item.purposes.map((p, pIdx) => (
                      <p key={pIdx} className="text-[11px] text-slate-300 font-mono-tech flex items-start space-x-1.5">
                        <span className="text-cyan-400">•</span>
                        <span>{p}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-[#0a1224]/90 flex items-center justify-between text-xs font-mono-tech">
          <span className="text-slate-400">
            Source: Material Safety Data Sheets (MSDS) & TearDown Lab Spectroscopy
          </span>
          <button
            onClick={() => {
              soundManager.playHover();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all font-tech font-bold"
          >
            DISMISS AUDIT
          </button>
        </div>
      </div>
    </div>
  );
};

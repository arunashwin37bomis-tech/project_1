/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneModel } from '../types';
import { X, Cpu, Battery, Eye, Thermometer, ShieldCheck, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SpecsOverviewModalProps {
  phones: PhoneModel[];
  currentPhone: PhoneModel;
  onSelectPhone: (phone: PhoneModel) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsOverviewModal: React.FC<SpecsOverviewModalProps> = ({
  phones,
  currentPhone,
  onSelectPhone,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const specCategories = [
    { label: 'Processor / SoC', key: 'soc', icon: Cpu },
    { label: 'Process Node', key: 'processNode', icon: Sparkles },
    { label: 'Operating Memory', key: 'ram', icon: Cpu },
    { label: 'Internal Storage', key: 'storage', icon: Cpu },
    { label: 'Battery Capacity & Chem', key: 'battery', icon: Battery },
    { label: 'Charging Speed', key: 'charging', icon: Battery },
    { label: 'Display Panel Tech', key: 'display', icon: Eye },
    { label: 'Primary Camera & Sensor', key: 'mainCamera', icon: Eye },
    { label: 'Optical Telephoto & OIS', key: 'telephotoCamera', icon: Eye },
    { label: 'Cooling & Dissipation', key: 'cooling', icon: Thermometer },
    { label: 'Chassis & Subframe Alloys', key: 'materials', icon: ShieldCheck }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto">
      <div className="relative w-full max-w-5xl max-h-[90vh] cyber-panel rounded-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden bg-[#070c18]/95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0a1224]/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl cyber-panel flex items-center justify-center border border-cyan-500/40 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono-tech uppercase text-cyan-400 font-bold tracking-wider">
                HARDWARE ARCHITECTURE COMPARISON
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white font-tech uppercase tracking-wide">
                Flagship Smartphone Teardown Specs
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

        {/* Comparison Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-xs font-mono-tech uppercase text-slate-400 w-1/4">
                  Specification
                </th>
                {phones.map((phone) => {
                  const isCurrent = phone.id === currentPhone.id;
                  return (
                    <th
                      key={phone.id}
                      className={`p-3 text-xs font-tech uppercase transition-colors ${
                        isCurrent
                          ? 'text-cyan-300 bg-cyan-950/30 border-b-2 border-cyan-400'
                          : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{phone.name}</span>
                        {!isCurrent && (
                          <button
                            onClick={() => {
                              soundManager.playSelect();
                              onSelectPhone(phone);
                              onClose();
                            }}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-900/60 text-cyan-400 font-mono-tech border border-slate-700"
                          >
                            Load 3D
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] font-mono-tech text-slate-500 normal-case block">
                        {phone.brand}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono-tech">
              {specCategories.map(({ label, key, icon: Icon }) => (
                <tr key={key} className="hover:bg-slate-900/30 transition-colors">
                  <td className="p-3 text-slate-400 font-medium flex items-center space-x-2">
                    <Icon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{label}</span>
                  </td>
                  {phones.map((phone) => {
                    const isCurrent = phone.id === currentPhone.id;
                    const val = phone.keySpecs[key as keyof typeof phone.keySpecs];
                    return (
                      <td
                        key={phone.id}
                        className={`p-3 leading-relaxed ${
                          isCurrent
                            ? 'text-white bg-cyan-950/15 font-semibold'
                            : 'text-slate-300'
                        }`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-[#0a1224]/90 flex items-center justify-end text-xs font-mono-tech">
          <button
            onClick={() => {
              soundManager.playHover();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all font-tech font-bold"
          >
            CLOSE COMPARISON
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Flame, Thermometer, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThermalScaleHUDProps {
  theme: ThemeMode;
}

export const ThermalScaleHUD: React.FC<ThermalScaleHUDProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // Realistic minor sensor fluctuation
  const [cpuTemp, setCpuTemp] = useState(89.4);
  const [modemTemp, setModemTemp] = useState(78.1);
  const [vcTemp, setVcTemp] = useState(58.6);
  const [batteryTemp, setBatteryTemp] = useState(43.5);
  const [chassisTemp, setChassisTemp] = useState(36.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuTemp(+(88.5 + Math.random() * 2.2).toFixed(1));
      setModemTemp(+(77.2 + Math.random() * 1.8).toFixed(1));
      setVcTemp(+(57.8 + Math.random() * 1.5).toFixed(1));
      setBatteryTemp(+(43.0 + Math.random() * 0.9).toFixed(1));
      setChassisTemp(+(36.4 + Math.random() * 0.7).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute bottom-28 right-3 sm:right-6 z-20 w-80 sm:w-88 rounded-xl p-3.5 backdrop-blur-md transition-all duration-300 pointer-events-auto border shadow-2xl animate-in fade-in slide-in-from-bottom-3 ${
        isDark
          ? 'bg-[#080d1a]/90 border-red-500/40 text-slate-200 shadow-red-950/30'
          : 'bg-white/95 border-red-400/50 text-slate-800 shadow-slate-300/60'
      }`}
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-red-500/20">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/30">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-red-500">
                INFRARED TELEMETRY
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <h3 className="text-xs font-bold font-tech uppercase tracking-wide">
              Thermal Dissipation Simulation
            </h3>
          </div>
        </div>

        <span
          className={`text-[10px] font-mono-tech px-2 py-0.5 rounded font-bold uppercase border ${
            isDark
              ? 'bg-red-950/80 text-red-300 border-red-500/40'
              : 'bg-red-50 text-red-700 border-red-300'
          }`}
        >
          120W STRESS
        </span>
      </div>

      {/* Heatmap Gradient Spectrum Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] font-mono-tech mb-1 font-bold">
          <span className="text-blue-500">25°C COOL</span>
          <span className="text-emerald-500">38°C FRAME</span>
          <span className="text-amber-500">55°C VC</span>
          <span className="text-orange-500">75°C RF</span>
          <span className="text-red-500">92°C PEAK</span>
        </div>

        {/* Multi-stop thermal color gradient */}
        <div className="h-3 w-full rounded-md shadow-inner border border-slate-700/40 overflow-hidden bg-gradient-to-r from-[#1e3a8a] via-[#06b6d4] via-[#10b981] via-[#eab308] via-[#f97316] to-[#dc2626]" />

        <div className="flex items-center justify-between text-[9px] font-mono-tech text-slate-400 mt-1">
          <span>Camera & Chassis Idle</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>Vapor Chamber Heat Spread</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>Silicon Core Peak</span>
        </div>
      </div>

      {/* Live Temperature Sensor Grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-2.5 font-mono-tech text-xs">
        {/* SoC Peak */}
        <div
          className={`p-2 rounded-lg border flex items-center justify-between ${
            isDark
              ? 'bg-red-950/30 border-red-500/30 text-slate-200'
              : 'bg-red-50/80 border-red-200 text-slate-800'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-semibold">SoC Tj Max</span>
          </div>
          <span className="font-bold text-red-500 text-xs">{cpuTemp}°C</span>
        </div>

        {/* 5G Modem */}
        <div
          className={`p-2 rounded-lg border flex items-center justify-between ${
            isDark
              ? 'bg-orange-950/30 border-orange-500/30 text-slate-200'
              : 'bg-orange-50/80 border-orange-200 text-slate-800'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] font-semibold">5G RF PA</span>
          </div>
          <span className="font-bold text-orange-500 text-xs">{modemTemp}°C</span>
        </div>

        {/* Vapor Chamber */}
        <div
          className={`p-2 rounded-lg border flex items-center justify-between ${
            isDark
              ? 'bg-amber-950/30 border-amber-500/30 text-slate-200'
              : 'bg-amber-50/80 border-amber-200 text-slate-800'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <Thermometer className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-semibold">Vapor Chamber</span>
          </div>
          <span className="font-bold text-amber-500 text-xs">{vcTemp}°C</span>
        </div>

        {/* Battery & PMIC */}
        <div
          className={`p-2 rounded-lg border flex items-center justify-between ${
            isDark
              ? 'bg-emerald-950/30 border-emerald-500/30 text-slate-200'
              : 'bg-emerald-50/80 border-emerald-200 text-slate-800'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px] font-semibold">Chassis Frame</span>
          </div>
          <span className="font-bold text-emerald-500 text-xs">{chassisTemp}°C</span>
        </div>
      </div>

      {/* Heat Flow Description */}
      <p className="text-[10px] font-mono-tech leading-relaxed text-slate-400">
        • Heat flows from the 2nm GAA SoC die across sintered copper vapor chamber wicks into graphite heat-spreaders and dissipates through the titanium/aluminum perimeter frame.
      </p>
    </div>
  );
};

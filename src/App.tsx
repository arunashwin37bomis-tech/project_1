/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PHONES_DATA } from './data/phonesData';
import { PhoneModel, ComponentPart, ViewMode, ThemeMode } from './types';
import { ThreeViewport } from './components/ThreeViewport';
import { Header } from './components/Header';
import { ExplodedControls } from './components/ExplodedControls';
import { ComponentListSidebar } from './components/ComponentListSidebar';
import { ComponentDossier } from './components/ComponentDossier';
import { ThermalScaleHUD } from './components/ThermalScaleHUD';
import { MaterialAnalyticsModal } from './components/MaterialAnalyticsModal';
import { SpecsOverviewModal } from './components/SpecsOverviewModal';
import { soundManager } from './utils/audio';
import { Sliders, HelpCircle, Table, Compass } from 'lucide-react';

export default function App() {
  const [currentPhone, setCurrentPhone] = useState<PhoneModel>(PHONES_DATA[0]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentPart | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<ComponentPart | null>(null);
  const [explodedProgress, setExplodedProgress] = useState<number>(0.35); // Default with slight exploded spacing to showcase 3D depth!
  const [viewMode, setViewMode] = useState<ViewMode>('realistic');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [resetCamTrigger, setResetCamTrigger] = useState<number>(0);

  // Custom GLB Asset state
  const [customGlbFile, setCustomGlbFile] = useState<File | null>(null);
  const [glbInfo, setGlbInfo] = useState<{ fileName: string; isGLB: boolean; componentCount: number }>({
    fileName: '',
    isGLB: false,
    componentCount: 0
  });

  // Handle phone model change
  const handleSelectPhone = (phone: PhoneModel) => {
    setCurrentPhone(phone);
    setSelectedComponent(null);
    setHoveredComponent(null);
  };

  // Handle GLB file import
  const handleImportGlbFile = (file: File) => {
    setCustomGlbFile(file);
    setSelectedComponent(null);
    setHoveredComponent(null);
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    soundManager.enabled = nextVal;
    setSoundEnabled(nextVal);
    if (nextVal) soundManager.playSelect();
  };

  // Theme toggle
  const handleToggleTheme = () => {
    soundManager.playModeSwitch();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Reset Camera
  const handleResetCamera = () => {
    setResetCamTrigger((prev) => prev + 1);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden flex flex-col font-sans select-none transition-colors duration-500 ${
        isDark ? 'bg-[#05070d] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
      }`}
    >
      {/* 3D Three.js Main Canvas Viewport */}
      <div className="absolute inset-0 z-0">
        <ThreeViewport
          model={currentPhone}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          hoveredComponent={hoveredComponent}
          onHoverComponent={setHoveredComponent}
          explodedProgress={explodedProgress}
          onExplodedChange={setExplodedProgress}
          viewMode={viewMode}
          theme={theme}
          autoRotate={autoRotate}
          onResetCameraTrigger={resetCamTrigger}
          customGlbFile={customGlbFile}
          onGlbLoaded={setGlbInfo}
          onDropGlbFile={handleImportGlbFile}
        />
      </div>

      {/* Top Header Navigation & Controls */}
      <Header
        phones={PHONES_DATA}
        currentPhone={currentPhone}
        onSelectPhone={handleSelectPhone}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetCamera={handleResetCamera}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onImportGlbFile={handleImportGlbFile}
        onClearGlb={() => setCustomGlbFile(null)}
        isGlbActive={glbInfo.isGLB}
        glbFileName={glbInfo.fileName}
      />

      {/* Left Hardware Components Drawer Sidebar */}
      <ComponentListSidebar
        model={currentPhone}
        selectedComponent={selectedComponent}
        onSelectComponent={setSelectedComponent}
        hoveredComponent={hoveredComponent}
        onHoverComponent={setHoveredComponent}
        theme={theme}
      />

      {/* Right Detailed Hardware Component Dossier HUD */}
      <ComponentDossier
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        theme={theme}
      />

      {/* Thermal Simulation Telemetry HUD (Shown when Thermal Mode is active) */}
      {viewMode === 'thermal' && (
        <ThermalScaleHUD theme={theme} />
      )}

      {/* Bottom Exploded View Separation Slider & Presets */}
      <ExplodedControls
        explodedProgress={explodedProgress}
        onExplodedChange={setExplodedProgress}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        onResetExplode={() => setExplodedProgress(0)}
        theme={theme}
      />

      {/* Floating Auxiliary HUD Indicators */}
      <div className="absolute top-20 right-4 z-10 hidden lg:flex flex-col items-end space-y-2 pointer-events-auto">
        {/* Compare Specs Button */}
        <button
          onClick={() => {
            soundManager.playSelect();
            setIsSpecsOpen(true);
          }}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-tech transition-all border shadow-md ${
            isDark
              ? 'cyber-panel text-cyan-300 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40'
              : 'bg-white text-cyan-800 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 font-bold shadow-slate-200'
          }`}
        >
          <Table className="w-3.5 h-3.5 text-cyan-500" />
          <span>COMPARE SPECS MATRIX</span>
        </button>

        {/* 3D Interaction Guideline Hint */}
        <div
          className={`px-3 py-2 rounded-lg border text-[11px] font-mono-tech max-w-xs shadow-lg backdrop-blur-md transition-colors ${
            isDark
              ? 'cyber-panel border-slate-800 text-slate-400'
              : 'bg-white/95 border-slate-200 text-slate-600 shadow-slate-200'
          }`}
        >
          <div className="flex items-center space-x-1.5 text-cyan-500 font-bold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>3D NAVIGATION CONTROLS</span>
          </div>
          <p>• Left Click + Drag to rotate 360°</p>
          <p>• Right Click + Drag to pan</p>
          <p>• Scroll wheel or pinch to zoom</p>
          <p>• Click any internal part to inspect</p>
        </div>
      </div>

      {/* Materials & Chemistry Matrix Modal */}
      <MaterialAnalyticsModal
        model={currentPhone}
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Flagships Hardware Comparison Modal */}
      <SpecsOverviewModal
        phones={PHONES_DATA}
        currentPhone={currentPhone}
        onSelectPhone={handleSelectPhone}
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </div>
  );
}

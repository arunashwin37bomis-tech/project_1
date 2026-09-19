/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';
import { Box, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { GLBLoadProgress } from './PhoneGLBAssembly';

interface GLBLoaderHUDProps {
  isLoading: boolean;
  progress: GLBLoadProgress | null;
  modelName: string;
  theme: ThemeMode;
  error?: string | null;
  onRetry?: () => void;
  onDismissError?: () => void;
}

export const GLBLoaderHUD: React.FC<GLBLoaderHUDProps> = ({
  isLoading,
  progress,
  modelName,
  theme,
  error,
  onRetry,
  onDismissError
}) => {
  const isDark = theme === 'dark';
  const percent = progress?.percent ?? 0;
  const stage = progress?.stage ?? 'INITIALIZING 3D ENGINE...';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none p-4"
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Spinner Card */}
          <div
            className={`relative max-w-sm w-full p-6 rounded-2xl border shadow-2xl flex flex-col items-center text-center transition-colors ${
              isDark
                ? 'cyber-panel bg-slate-950/90 border-cyan-500/40 text-slate-100 shadow-cyan-500/10'
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300'
            }`}
          >
            {/* Spinning Radar Ring */}
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />

              {/* Progress SVG Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={isDark ? '#1e293b' : '#e2e8f0'}
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#06b6d4"
                  strokeWidth="6"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * percent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-150 ease-out"
                />
              </svg>

              {/* Center icon / percentage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold font-mono-tech text-cyan-400">
                  {percent}%
                </span>
              </div>
            </div>

            {/* Model & Status Header */}
            <div className="flex items-center space-x-2 text-xs font-tech tracking-wider uppercase text-cyan-500 mb-1">
              <Box className="w-3.5 h-3.5 animate-bounce" />
              <span>IMPORTING 3D ASSET</span>
            </div>

            <h3 className="text-base font-bold font-tech tracking-wide mb-1">
              {modelName}
            </h3>

            <p
              className={`text-xs font-mono-tech max-w-xs truncate mb-4 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {stage}
            </p>

            {/* Linear Progress Track */}
            <div className="w-full bg-slate-800/40 rounded-full h-1.5 overflow-hidden mb-2 border border-slate-700/30">
              <div
                className="bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-400 h-full rounded-full transition-all duration-150"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="w-full flex justify-between text-[10px] font-mono-tech text-slate-500">
              <span>GLTF 2.0 BINARY</span>
              <span>DRACO OPTIMIZED</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error notification banner if a GLB fails to fetch or parse */}
      {error && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full px-4 pointer-events-auto"
        >
          <div
            className={`p-3 rounded-xl border flex items-start space-x-3 shadow-xl backdrop-blur-md ${
              isDark
                ? 'bg-slate-950/95 border-amber-500/40 text-amber-200'
                : 'bg-white/95 border-amber-400/50 text-amber-900'
            }`}
          >
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <div className="font-bold font-tech uppercase tracking-wide">
                Procedural CAD Active (GLB Fallback)
              </div>
              <p className="font-sans text-[11px] opacity-80 mt-0.5">
                {error}
              </p>
              <div className="mt-2 flex space-x-2">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-mono-tech text-[10px] border border-amber-500/30 transition-colors"
                  >
                    RETRY GLB
                  </button>
                )}
                {onDismissError && (
                  <button
                    onClick={onDismissError}
                    className="px-2 py-1 rounded bg-slate-800/40 hover:bg-slate-800/60 text-slate-400 font-mono-tech text-[10px] border border-slate-700/30 transition-colors"
                  >
                    DISMISS
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

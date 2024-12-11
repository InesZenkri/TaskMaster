import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, X } from 'lucide-react';
import { Analytics } from './Analytics';
import { useThemeStore } from '../store/useThemeStore';
import { Analytics as AnalyticsType } from '../types/todo';

interface AnalyticsSidebarProps {
  show: boolean;
  onClose: () => void;
  data: AnalyticsType;
}

export function AnalyticsSidebar({ show, onClose, data }: AnalyticsSidebarProps) {
  const { theme } = useThemeStore();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className={`fixed right-0 top-0 h-full w-full max-w-2xl ${bgColor} p-6 shadow-xl z-50 overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <h2 className={`text-xl font-bold ${textColor}`}>Analytics Dashboard</h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors ${textColor}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <Analytics data={data} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
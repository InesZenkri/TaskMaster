import React from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Moon, Sun, BarChart3, Calendar as CalendarIcon, Archive } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

interface HeaderProps {
  completedTodosCount: number;
  onToggleTheme: () => void;
  onToggleCalendar: () => void;
  onShowAnalytics: () => void;
  onShowArchive: () => void;
}

export function Header({
  completedTodosCount,
  onToggleTheme,
  onToggleCalendar,
  onShowAnalytics,
  onShowArchive,
}: HeaderProps) {
  const { theme } = useThemeStore();
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className="flex items-center justify-between mb-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2"
      >
        <ListTodo className="w-10 h-10" />
        <h1 className={`text-4xl font-bold ${textColor}`}>Just Do It</h1>
      </motion.div>

      <div className="flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={onToggleCalendar}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <CalendarIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onShowAnalytics}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <BarChart3 className="w-6 h-6" />
        </button>
        <button
          onClick={onShowArchive}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
        >
          <Archive className="w-6 h-6" />
          {completedTodosCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {completedTodosCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
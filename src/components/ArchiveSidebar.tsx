import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Archive, X, Calendar, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import { useThemeStore } from '../store/useThemeStore';

interface ArchiveSidebarProps {
  show: boolean;
  onClose: () => void;
  completedTodos: Todo[];
}

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export function ArchiveSidebar({ show, onClose, completedTodos }: ArchiveSidebarProps) {
  const { theme } = useThemeStore();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-gray-200';

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
            className={`fixed right-0 top-0 h-full w-full max-w-md ${bgColor} p-6 shadow-xl z-50 overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Archive className="w-6 h-6 text-purple-400" />
                <h2 className={`text-xl font-bold ${textColor}`}>Completed Tasks</h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors ${textColor}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {completedTodos.length === 0 ? (
                <div className="text-center py-8">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
                    alt="No tasks"
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <p className={`${textColor} opacity-60`}>
                    No completed tasks yet. Keep going! 💪
                  </p>
                </div>
              ) : (
                completedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} p-4 rounded-lg border ${borderColor}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-lg ${textColor}`}>{todo.text}</span>
                      <span className={`text-sm ${priorityColors[todo.priority]}`}>
                        <AlertCircle className="w-4 h-4" />
                      </span>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'} space-y-1`}>
                      <p>Created: {format(todo.createdAt, 'PPP p')}</p>
                      {todo.completedAt && (
                        <p>Completed: {format(todo.completedAt, 'PPP p')}</p>
                      )}
                      {todo.dueDate && (
                        <p className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {format(todo.dueDate, 'PPP')}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
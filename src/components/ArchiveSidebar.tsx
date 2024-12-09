import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Archive, X } from 'lucide-react';
import { Todo } from '../types/todo';

interface ArchiveSidebarProps {
  show: boolean;
  onClose: () => void;
  completedTodos: Todo[];
}

export function ArchiveSidebar({ show, onClose, completedTodos }: ArchiveSidebarProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Archive className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold">Completed Tasks</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {completedTodos.length === 0 ? (
                <p className="text-white/60 text-center py-8">
                  No completed tasks yet. Keep going! 💪
                </p>
              ) : (
                completedTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="bg-white/5 p-4 rounded-lg"
                  >
                    <p className="text-lg mb-2">{todo.text}</p>
                    <div className="text-sm text-white/40">
                      <p>Created: {format(todo.createdAt, 'PPP p')}</p>
                      {todo.completedAt && (
                        <p>Completed: {format(todo.completedAt, 'PPP p')}</p>
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Briefcase, User, ShoppingCart, Heart, Edit2, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '../types/todo';
import { useThemeStore } from '../store/useThemeStore';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newData: Partial<Todo>) => void;
}

const categoryIcons = {
  work: Briefcase,
  personal: User,
  shopping: ShoppingCart,
  health: Heart,
};

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const { theme } = useThemeStore();
  const Icon = categoryIcons[todo.category];
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    text: todo.text,
    dueDate: todo.dueDate ? format(todo.dueDate, 'yyyy-MM-dd') : '',
    priority: todo.priority
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData.text.trim()) {
      onEdit(todo.id, {
        text: editData.text,
        dueDate: editData.dueDate ? new Date(editData.dueDate) : undefined,
        priority: editData.priority
      });
      setIsEditing(false);
    }
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-white/5' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-gray-200';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group flex items-center gap-4 p-4 ${bgColor} ${hoverBg} border ${borderColor} rounded-lg transition-colors`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : `border-gray-300 hover:border-gray-400`
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      <div className="flex-1">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={editData.text}
              onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))}
              className={`w-full px-2 py-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'} rounded border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
              autoFocus
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={editData.dueDate}
                onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                className={`px-2 py-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'} rounded border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
              />
              <select
                value={editData.priority}
                onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value as Todo['priority'] }))}
                className={`px-2 py-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'} rounded border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-purple-400" />
              <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : textColor}`}>
                {todo.text}
              </span>
              <span className={`text-sm ${priorityColors[todo.priority]}`}>
                <AlertCircle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{format(todo.createdAt, 'MMM d, yyyy HH:mm')}</span>
              {todo.dueDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(todo.dueDate, 'MMM d, yyyy')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && !todo.completed && (
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-purple-500/20 rounded-lg transition-all"
        >
          <Edit2 className="w-5 h-5 text-purple-400" />
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg transition-all"
      >
        <Trash2 className="w-5 h-5 text-red-400" />
      </button>
    </motion.div>
  );
}
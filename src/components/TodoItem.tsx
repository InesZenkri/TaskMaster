import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Briefcase, User, ShoppingCart, Heart, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const categoryIcons = {
  work: Briefcase,
  personal: User,
  shopping: ShoppingCart,
  health: Heart,
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const Icon = categoryIcons[todo.category];
  const [editText, setEditText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      <div className="flex-1">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-2 py-1 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-1 bg-purple-500 rounded hover:bg-purple-600"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-purple-400" />
            <span
              className={`text-lg ${
                todo.completed ? 'line-through text-white/40' : 'text-white'
              }`}
            >
              {todo.text}
            </span>
          </div>
        )}
        <span className="text-sm text-white/40">
          {format(todo.createdAt, 'MMM d, yyyy HH:mm')}
        </span>
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
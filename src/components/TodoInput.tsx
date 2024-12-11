import React, { useState } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { Todo } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, category: Todo['category'], priority: Todo['priority'], dueDate?: Date) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const { theme } = useThemeStore();
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Todo['category']>('personal');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(
        text,
        category,
        priority,
        dueDate ? new Date(dueDate) : undefined
      );
      setText('');
      setDueDate('');
    }
  };

  const inputBg = theme === 'dark' ? 'bg-white/10' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-white/20' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors text-white"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Todo['category'])}
          className={`px-4 py-2 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo['priority'])}
          className={`px-4 py-2 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className="relative flex-1">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-purple-500 ${textColor}`}
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
    </form>
  );
}
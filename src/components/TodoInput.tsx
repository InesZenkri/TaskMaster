import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string, category: 'work' | 'personal' | 'shopping' | 'health') => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'shopping' | 'health'>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, category);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}
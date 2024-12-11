import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';
import { useThemeStore } from '../store/useThemeStore';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newData: Partial<Todo>) => void;
  onClearCompleted: () => void;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onClearCompleted,
}: TodoListProps) {
  const { theme } = useThemeStore();
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {activeTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {todos.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className={`${textColor} opacity-60`}>
            {activeTodos.length} active, {completedTodos.length} completed
          </span>
          {completedTodos.length > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-4 py-2 text-sm bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}
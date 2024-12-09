import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, ListTodo, Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { ArchiveSidebar } from './components/ArchiveSidebar';
import { CompletionMeme } from './components/CompletionMeme';
import { useTodoStore } from './store/useTodoStore';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { theme, toggleTheme } = useThemeStore();
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, updateTodoText } = useTodoStore();
  const [showArchive, setShowArchive] = useState(false);
  const [showCompletionMeme, setShowCompletionMeme] = useState(false);

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
    const todo = todos.find((t) => t.id === id);
    if (!todo?.completed) {
      setShowCompletionMeme(true);
    }
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'
        : 'bg-gradient-to-br from-white via-purple-50 to-violet-100 text-gray-900'
    }`}>
      <Toaster position="top-right" />
      <CompletionMeme
        show={showCompletionMeme}
        onClose={() => setShowCompletionMeme(false)}
      />
      <ArchiveSidebar
        show={showArchive}
        onClose={() => setShowArchive(false)}
        completedTodos={completedTodos}
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <ListTodo className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Super Todo</h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setShowArchive(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
            >
              <Archive className="w-6 h-6" />
              {completedTodos.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {completedTodos.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-6 ${
            theme === 'dark' ? 'shadow-xl' : 'shadow-lg'
          }`}>
            <TodoInput onAdd={addTodo} />

            <div className="space-y-4">
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={deleteTodo}
                  onEdit={updateTodoText}
                />
              ))}
            </div>

            {todos.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60">
                  {activeTodos.length} active, {completedTodos.length} completed
                </span>
                {completedTodos.length > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="px-4 py-2 text-sm bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Clear completed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
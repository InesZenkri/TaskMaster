import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { ArchiveSidebar } from './components/ArchiveSidebar';
import { AnalyticsSidebar } from './components/AnalyticsSidebar';
import { Calendar } from './components/Calendar';
import { CompletionMeme } from './components/CompletionMeme';
import { AuthForms } from './components/AuthForms';
import { useTodoStore } from './store/useTodoStore';
import { useThemeStore } from './store/useThemeStore';
import { useAuthStore } from './store/useAuthStore';
import { calculateAnalytics } from './utils/analytics';

function App() {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, updateTodoText } = useTodoStore();
  const [showArchive, setShowArchive] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCompletionMeme, setShowCompletionMeme] = useState(false);

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
    const todo = todos.find((t) => t.id === id);
    if (!todo?.completed) {
      setShowCompletionMeme(true);
    }
  };

  const analytics = calculateAnalytics(todos);
  const completedTodos = todos.filter((todo) => todo.completed);

  const bgGradient = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-white via-purple-50 to-violet-100';

  if (!user) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center p-4`}>
        <AuthForms />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${bgGradient}`}>
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
      
      <AnalyticsSidebar
        show={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        data={analytics}
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Header
          completedTodosCount={completedTodos.length}
          onToggleTheme={toggleTheme}
          onToggleCalendar={() => setShowCalendar(!showCalendar)}
          onShowAnalytics={() => setShowAnalytics(true)}
          onShowArchive={() => setShowArchive(true)}
        />

        <div className="space-y-6">
          {showCalendar && (
            <Calendar todos={todos} />
          )}

          <div className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-6 shadow-xl`}>
            <TodoInput onAdd={addTodo} />
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={deleteTodo}
              onEdit={updateTodoText}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
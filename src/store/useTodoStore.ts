import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo } from '../types/todo';
import toast from 'react-hot-toast';

interface TodoStore {
  todos: Todo[];
  showArchive: boolean;
  addTodo: (text: string, category: Todo['category']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  toggleArchive: () => void;
  setEditing: (id: string, isEditing: boolean) => void;
  updateTodoText: (id: string, text: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      showArchive: false,
      addTodo: (text, category) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: new Date(),
              category,
            },
          ],
        }));
        toast.success('Task added successfully! 🎉');
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? new Date() : undefined,
                }
              : todo
          ),
        })),
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
        toast.error('Task deleted 🗑️');
      },
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      })),
      toggleArchive: () => set((state) => ({ showArchive: !state.showArchive })),
      setEditing: (id, isEditing) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isEditing } : todo
          ),
        })),
      updateTodoText: (id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text, isEditing: false } : todo
          ),
        })),
    }),
    { name: 'todo-storage' }
  )
);
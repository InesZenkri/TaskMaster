import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getTodoStorageUser, setTodoStorageUser, todoStorage } from './todoStorage.ts';
import type { Todo } from '../types/todo';
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
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => todoStorage),
    }
  )
);

// Point the store at the signed-in user's task list. The visible list is
// reset on every switch so one user's tasks never bleed into another's
// session; the previous user's stored tasks stay untouched under their key.
// The old shared 'todo-storage' entry is left in place but no longer read,
// because its owner cannot be determined.
export function syncTodosWithUser(userId: string | null): void {
  if (getTodoStorageUser() === userId) return;
  // Pause persistence while clearing the visible list, so the outgoing user's
  // stored tasks are not overwritten and the incoming user's are not clobbered.
  setTodoStorageUser(null);
  useTodoStore.setState({ todos: [], showArchive: false });
  setTodoStorageUser(userId);
  if (userId) void useTodoStore.persist.rehydrate();
}
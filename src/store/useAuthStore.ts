import { create } from 'zustand';
import type { User } from '../types/todo';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  auth
} from '../firebase';
import { syncTodosWithUser } from './useTodoStore.ts';

interface AuthStore {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  (set) => ({
      user: null,
      loading: true,
      signUp: async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        set({ user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: userCredential.user.displayName || undefined,
          photoURL: userCredential.user.photoURL || undefined,
        }});
      },
      signIn: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        set({ user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: userCredential.user.displayName || undefined,
          photoURL: userCredential.user.photoURL || undefined,
        }});
      },
      logout: async () => {
        await signOut(auth);
        set({ user: null });
      },
      resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
      },
    })
);
// Keep the task list scoped to whoever is signed in. This also covers the
// Firebase session being restored on page load.
useAuthStore.subscribe((state) => {
  syncTodosWithUser(state.user?.id ?? null);
});
syncTodosWithUser(useAuthStore.getState().user?.id ?? null);

// Firebase, not a cached auth-storage user, owns the restored session.
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({
    user: user ? {
      id: user.uid,
      email: user.email!,
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
    } : null,
    loading: false,
  });
});

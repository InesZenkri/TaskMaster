import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/todo';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  auth
} from '../firebase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
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
    }),
    { name: 'auth-storage' }
  )
);
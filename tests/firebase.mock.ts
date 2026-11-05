type FakeUser = { uid: string; email: string };
let listener: (user: FakeUser | null) => void;
export const auth = {};
export function onAuthStateChanged(_: unknown, callback: typeof listener) { listener = callback; }
export function emitUser(user: FakeUser | null) { listener(user); }
export async function signInWithEmailAndPassword(_: unknown, email: string) {
  return { user: { uid: email, email } };
}
export const createUserWithEmailAndPassword = signInWithEmailAndPassword;
export async function signOut() { emitUser(null); }
export async function sendPasswordResetEmail() {}

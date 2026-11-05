import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier === '../firebase') return { url: new URL('./firebase.mock.ts', import.meta.url).href, shortCircuit: true };
  return nextResolve(specifier, context);
} });
const entries = new Map<string, string>();
entries.set('auth-storage', JSON.stringify({ state: { user: { id: 'stale-user' } } }));
Object.defineProperty(globalThis, 'localStorage', { value: {
  getItem: (key: string) => entries.get(key) ?? null,
  setItem: (key: string, value: string) => entries.set(key, value),
  removeItem: (key: string) => entries.delete(key),
}, configurable: true });
const { useAuthStore } = await import('../src/store/useAuthStore.ts');
const { useTodoStore } = await import('../src/store/useTodoStore.ts');
const { emitUser } = await import('./firebase.mock.ts');

test('cached auth cannot reveal tasks before Firebase restores a session', () => {
  assert.equal(useAuthStore.getState().user, null);
  assert.deepEqual(useTodoStore.getState().todos, []);
  assert.equal(useAuthStore.getState().loading, true);
});

test('Firebase session changes, login, and logout switch task storage', async () => {
  emitUser({ uid: 'alice', email: 'alice' });
  useTodoStore.getState().addTodo('alice private task', 'personal');
  emitUser(null);
  assert.deepEqual(useTodoStore.getState().todos, []);
  await useAuthStore.getState().signIn('bob', 'fake-test-only');
  assert.deepEqual(useTodoStore.getState().todos, []);
  useTodoStore.getState().addTodo('bob task', 'work');
  await useAuthStore.getState().logout();
  assert.deepEqual(useTodoStore.getState().todos, []);
  emitUser({ uid: 'alice', email: 'alice' });
  assert.deepEqual(useTodoStore.getState().todos.map(t => t.text), ['alice private task']);
});

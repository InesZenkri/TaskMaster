import test from 'node:test';
import assert from 'node:assert/strict';

class MemoryStorage {
  private map = new Map<string, string>();
  get length() { return this.map.size; }
  clear() { this.map.clear(); }
  getItem(key: string) { return this.map.has(key) ? this.map.get(key)! : null; }
  key(index: number) { return [...this.map.keys()][index] ?? null; }
  removeItem(key: string) { this.map.delete(key); }
  setItem(key: string, value: string) { this.map.set(key, String(value)); }
  keys() { return [...this.map.keys()]; }
}

(globalThis as Record<string, unknown>).localStorage = new MemoryStorage();

const { useTodoStore, syncTodosWithUser } = await import('../src/store/useTodoStore.ts');

const storage = () => globalThis.localStorage as unknown as MemoryStorage;
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function reset(storageSeed?: Record<string, string>) {
  const mem = new MemoryStorage();
  for (const [k, v] of Object.entries(storageSeed ?? {})) mem.setItem(k, v);
  (globalThis as Record<string, unknown>).localStorage = mem;
  syncTodosWithUser(null);
}

test('each signed-in user gets an isolated task list', async () => {
  reset();
  syncTodosWithUser('alice');
  await flush();
  useTodoStore.getState().addTodo('alice task', 'personal');
  assert.deepEqual(storage().keys(), ['todo-storage:u:alice']);

  syncTodosWithUser('bob');
  await flush();
  assert.deepEqual(useTodoStore.getState().todos, [], 'bob must not see alice tasks');
  useTodoStore.getState().addTodo('bob task', 'work');
  assert.deepEqual(storage().keys().sort(), ['todo-storage:u:alice', 'todo-storage:u:bob']);

  syncTodosWithUser('alice');
  await flush();
  assert.deepEqual(useTodoStore.getState().todos.map((t) => t.text), ['alice task']);
});

test('signing out hides tasks without deleting them', async () => {
  reset();
  syncTodosWithUser('alice');
  await flush();
  useTodoStore.getState().addTodo('alice task', 'personal');

  syncTodosWithUser(null);
  await flush();
  assert.deepEqual(useTodoStore.getState().todos, []);
  assert.deepEqual(storage().keys(), ['todo-storage:u:alice'], 'stored tasks stay on disk');

  syncTodosWithUser('alice');
  await flush();
  assert.deepEqual(useTodoStore.getState().todos.map((t) => t.text), ['alice task']);
});

test('legacy shared storage is left untouched and never adopted', async () => {
  const legacy = JSON.stringify({
    state: {
      todos: [{ id: 'old', text: 'legacy task', completed: false, createdAt: new Date().toISOString(), category: 'personal' }],
      showArchive: false,
    },
    version: 0,
  });
  reset({ 'todo-storage': legacy });

  syncTodosWithUser('carol');
  await flush();
  assert.deepEqual(useTodoStore.getState().todos, [], 'legacy tasks are not assigned to the next login');
  assert.equal(storage().getItem('todo-storage'), legacy, 'legacy entry is not modified or deleted');
});

test('signed-out changes are never written to a shared key', async () => {
  reset();
  useTodoStore.getState().addTodo('anonymous task', 'personal');
  assert.deepEqual(storage().keys(), [], 'nothing persists while signed out');
});

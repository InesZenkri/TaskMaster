import type { StateStorage } from 'zustand/middleware';

// Tasks are persisted per authenticated user instead of under one shared key,
// so signing out and in as someone else never exposes the previous user's list.
let currentUserId: string | null = null;

export function getTodoStorageUser(): string | null {
  return currentUserId;
}

export function setTodoStorageUser(userId: string | null): void {
  currentUserId = userId;
}

function scopedKey(name: string): string | null {
  if (!currentUserId) return null;
  return `${name}:u:${currentUserId}`;
}

export const todoStorage: StateStorage = {
  getItem: (name) => {
    const key = scopedKey(name);
    if (!key) return null;
    return globalThis.localStorage?.getItem(key) ?? null;
  },
  setItem: (name, value) => {
    const key = scopedKey(name);
    if (key) globalThis.localStorage?.setItem(key, value);
  },
  removeItem: (name) => {
    const key = scopedKey(name);
    if (key) globalThis.localStorage?.removeItem(key);
  },
};

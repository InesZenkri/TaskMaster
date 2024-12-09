export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  category: 'work' | 'personal' | 'shopping' | 'health';
  isEditing?: boolean;
}

export type Theme = 'light' | 'dark';
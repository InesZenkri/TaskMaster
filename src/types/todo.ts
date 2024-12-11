export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  category: 'work' | 'personal' | 'shopping' | 'health';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId?: string;
}

export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Analytics {
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
  tasksByCategory: Record<string, number>;
  tasksByPriority: Record<string, number>;
  completionTrend: Array<{
    date: string;
    completed: number;
  }>;
}
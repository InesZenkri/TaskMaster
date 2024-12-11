import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { Todo, Analytics } from '../types/todo';

export function calculateAnalytics(todos: Todo[]): Analytics {
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

  // Calculate tasks by category
  const tasksByCategory = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate tasks by priority
  const tasksByPriority = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate completion trend for the current week
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const completionTrend = weekDays.map(day => ({
    date: format(day, 'yyyy-MM-dd'),
    completed: todos.filter(todo => 
      todo.completed && 
      todo.completedAt && 
      format(new Date(todo.completedAt), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    ).length
  }));

  return {
    completedTasks,
    totalTasks,
    completionRate,
    tasksByCategory,
    tasksByPriority,
    completionTrend
  };
}
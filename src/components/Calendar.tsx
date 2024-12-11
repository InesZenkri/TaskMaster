import React from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Todo } from '../types/todo';
import { useThemeStore } from '../store/useThemeStore';

interface CalendarProps {
  todos: Todo[];
}

export function Calendar({ todos }: CalendarProps) {
  const { theme } = useThemeStore();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-white/5' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-gray-200';

  const getTodosForDay = (date: Date) => {
    return todos.filter(todo => todo.dueDate && isSameDay(new Date(todo.dueDate), date));
  };

  return (
    <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${textColor}`}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={`text-center font-semibold ${textColor}`}>
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayTodos = getTodosForDay(day);
          const hasHighPriority = dayTodos.some(todo => todo.priority === 'high');
          
          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                p-2 min-h-[80px] rounded-lg border ${borderColor}
                ${hasHighPriority ? 'border-red-500' : ''}
                ${isSameDay(day, new Date()) ? 'bg-purple-500/20' : ''}
              `}
            >
              <div className={`text-sm ${textColor}`}>{format(day, 'd')}</div>
              <div className="mt-1 space-y-1">
                {dayTodos.map(todo => (
                  <div
                    key={todo.id}
                    className={`text-xs p-1 rounded ${
                      todo.priority === 'high'
                        ? 'bg-red-500/20 text-red-500'
                        : todo.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-green-500/20 text-green-500'
                    }`}
                  >
                    {todo.text}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { Analytics as AnalyticsType } from '../types/todo';
import { useThemeStore } from '../store/useThemeStore';

interface AnalyticsProps {
  data: AnalyticsType;
}

const CATEGORY_COLORS = {
  work: '#4F46E5', // Indigo
  personal: '#EC4899', // Pink
  shopping: '#10B981', // Emerald
  health: '#F59E0B', // Amber
};

const PRIORITY_COLORS = {
  high: '#EF4444', // Red
  medium: '#F59E0B', // Amber
  low: '#10B981', // Emerald
};

export function Analytics({ data }: AnalyticsProps) {
  const { theme } = useThemeStore();
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-white/5' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-gray-200';

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const categoryData = Object.entries(data.tasksByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS],
  }));

  const priorityData = Object.entries(data.tasksByPriority).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: PRIORITY_COLORS[name as keyof typeof PRIORITY_COLORS],
  }));

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
          <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>Completion Rate</h3>
          <p className="text-3xl font-bold text-purple-500">
            {Math.round(data.completionRate * 100)}%
          </p>
        </div>
        <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
          <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>Tasks This Week</h3>
          <p className="text-3xl font-bold text-purple-500">{data.totalTasks}</p>
        </div>
        <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
          <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>Completed Tasks</h3>
          <p className="text-3xl font-bold text-purple-500">{data.completedTasks}</p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Tasks by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                formatter={(value) => {
                  const category = categoryData.find(c => c.name === value);
                  return (
                    <span style={{ color: category?.color }}>
                      {value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Tasks by Priority</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                formatter={(value) => {
                  const priority = priorityData.find(p => p.name === value);
                  return (
                    <span style={{ color: priority?.color }}>
                      {value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className={`${bgColor} p-6 rounded-lg border ${borderColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.completionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                stroke={theme === 'dark' ? '#fff' : '#000'}
                tickFormatter={(value) => format(new Date(value), 'EEE')}
              />
              <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
              <Tooltip />
              <Bar dataKey="completed" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productivity Score */}
      <div className={`${bgColor} p-6 rounded-lg border ${borderColor} text-center`}>
        <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>Weekly Productivity Score</h3>
        <div className="relative inline-flex">
          <svg className="w-32 h-32">
            <circle
              className="text-gray-300"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
            />
            <circle
              className="text-purple-500"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="56"
              cx="64"
              cy="64"
              strokeDasharray={`${data.completionRate * 352} 352`}
              transform="rotate(-90 64 64)"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-purple-500">
            {Math.round(data.completionRate * 100)}
          </span>
        </div>
        <p className={`mt-2 ${textColor}`}>
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d')}
        </p>
      </div>
    </div>
  );
}
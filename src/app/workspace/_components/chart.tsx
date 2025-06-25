"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Project } from './workSpace';

interface ProjectChartProps {
  project: Project;
}

export const ProjectChart: React.FC<ProjectChartProps> = ({ project }) => {
  // Task status data for pie chart
  const taskStatusData = [
    {
      name: 'A Fazer',
      value: project.tasks.filter(task => task.status === 'todo').length,
      color: '#ef4444'
    },
    {
      name: 'Em Progresso',
      value: project.tasks.filter(task => task.status === 'in-progress').length,
      color: '#f59e0b'
    },
    {
      name: 'Concluído',
      value: project.tasks.filter(task => task.status === 'done').length,
      color: '#10b981'
    }
  ];

  // Task priority data for bar chart
  const taskPriorityData = [
    {
      name: 'Baixa',
      value: project.tasks.filter(task => task.priority === 'low').length
    },
    {
      name: 'Média',
      value: project.tasks.filter(task => task.priority === 'medium').length
    },
    {
      name: 'Alta',
      value: project.tasks.filter(task => task.priority === 'high').length
    }
  ];

  // Weekly progress data (mock data for demonstration)
  const weeklyProgressData = [
    { week: 'Sem 1', progress: 10 },
    { week: 'Sem 2', progress: 25 },
    { week: 'Sem 3', progress: 40 },
    { week: 'Sem 4', progress: project.progress }
  ];

  const chartConfig = {
    todo: { label: 'A Fazer', color: '#ef4444' },
    'in-progress': { label: 'Em Progresso', color: '#f59e0b' },
    done: { label: 'Concluído', color: '#10b981' },
    low: { label: 'Baixa', color: '#3b82f6' },
    medium: { label: 'Média', color: '#f59e0b' },
    high: { label: 'Alta', color: '#ef4444' }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Status Distribution */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Distribuição de Tarefas por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Task Priority Distribution */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Distribuição por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskPriorityData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#9ca3af' }}
                  axisLine={{ stroke: '#4b5563' }}
                />
                <YAxis 
                  tick={{ fill: '#9ca3af' }}
                  axisLine={{ stroke: '#4b5563' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={4} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Progresso Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyProgressData}>
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: '#9ca3af' }}
                  axisLine={{ stroke: '#4b5563' }}
                />
                <YAxis 
                  tick={{ fill: '#9ca3af' }}
                  axisLine={{ stroke: '#4b5563' }}
                  domain={[0, 100]}
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

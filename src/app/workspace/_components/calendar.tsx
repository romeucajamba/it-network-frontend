"use client"
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from './workSpace';

interface ProjectCalendarProps {
  project: Project;
}

export const ProjectCalendar: React.FC<ProjectCalendarProps> = ({ project }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get tasks for the selected date
  const getTasksForDate = (date: Date) => {
    return project.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  // Get dates with tasks for highlighting
  const getDatesWithTasks = () => {
    return project.tasks.map(task => new Date(task.dueDate));
  };

  const datesWithTasks = getDatesWithTasks();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Calendário do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-slate-700"
            modifiers={{
              hasTask: datesWithTasks
            }}
            modifiersStyles={{
              hasTask: {
                backgroundColor: 'rgb(59 130 246)',
                color: 'white',
                borderRadius: '50%'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Tasks for Selected Date */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            Tarefas para {selectedDate?.toLocaleDateString('pt-BR')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateTasks.length > 0 ? (
            <div className="space-y-3">
              {selectedDateTasks.map((task) => (
                <div key={task.id} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium">{task.title}</h4>
                    <Badge
                      variant={task.priority === 'high' ? 'destructive' : 
                              task.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={task.status === 'done' ? 'default' : 'outline'}
                      className={task.status === 'done' ? 'bg-green-600' : ''}
                    >
                      {task.status === 'todo' && 'A Fazer'}
                      {task.status === 'in-progress' && 'Em Progresso'}
                      {task.status === 'done' && 'Concluído'}
                    </Badge>
                    {task.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {task.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                        {task.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                            +{task.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhuma tarefa para esta data</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
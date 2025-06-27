"use client"

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {CreateTaskModal} from './_components/createTaskModal';
import {TaskCard} from './_components/taskCard';
import { Task, TaskType } from '@/types/agenda';

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<TaskType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'status'>('date');

  // Mock data inicial
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Reunião de Projeto',
        description: 'Discussão sobre o novo sistema de gestão',
        type: 'meeting',
        priority: 'high',
        status: 'pending',
        startDate: new Date(),
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas depois
        startTime: '09:00',
        endTime: '11:00',
        attachments: [],
        links: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    setTasks(mockTasks);
  }, []);

  // Filtrar tarefas por data selecionada
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.startDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  // Filtrar tarefas por tipo
  const filteredTasks = getTasksForDate(selectedDate).filter(task => 
    filterType === 'all' || task.type === filterType
  );

  // Ordenar tarefas
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'date') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }
    if (sortBy === 'status') {
      const statusOrder = { pending: 2, completed: 1 };
      return statusOrder[b.status] - statusOrder[a.status];
    }
    return 0;
  });

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, task]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? { ...updatedTask, updatedAt: new Date() } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'study': return '📚';
      case 'exercise': return '💪';
      case 'school': return '🎓';
      case 'programming': return '💻';
      case 'other': return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Minha Agenda</h1>
          <p className="text-gray-400">Gerencie suas atividades e compromissos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Calendário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border-slate-700"
                modifiers={{
                  hasTask: tasks.map(task => new Date(task.startDate))
                }}
                modifiersStyles={{
                  hasTask: {
                    backgroundColor: 'rgb(59 130 246)',
                    color: 'white',
                    borderRadius: '50%'
                  }
                }}
              />
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Dias com atividades
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Tarefas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header com filtros */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-white">
                    Atividades para {format(selectedDate, "dd 'de' MMMM", { locale: pt })}
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Atividade
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  {/* Filtro por tipo */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filterType === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType('all')}
                    >
                      Todos
                    </Button>
                    {(['meeting', 'study', 'exercise', 'school', 'programming', 'other'] as TaskType[]).map(type => (
                      <Button
                        key={type}
                        variant={filterType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType(type)}
                        className="flex items-center"
                      >
                        <span className="mr-1">{getTypeIcon(type)}</span>
                        {type === 'meeting' && 'Reunião'}
                        {type === 'study' && 'Estudos'}
                        {type === 'exercise' && 'Exercício'}
                        {type === 'school' && 'Escola'}
                        {type === 'programming' && 'Programação'}
                        {type === 'other' && 'Outros'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ordenação */}
                <div className="flex gap-2 mb-4">
                  <span className="text-sm text-gray-400">Ordenar por:</span>
                  <Button
                    variant={sortBy === 'date' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy('date')}
                  >
                    Data
                  </Button>
                  <Button
                    variant={sortBy === 'priority' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy('priority')}
                  >
                    Prioridade
                  </Button>
                  <Button
                    variant={sortBy === 'status' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy('status')}
                  >
                    Status
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Tarefas */}
            <div className="space-y-4">
              {sortedTasks.length > 0 ? (
                sortedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <CalendarIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-400 mb-4">
                        Nenhuma atividade para esta data
                      </p>
                      <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Criar primeira atividade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Agenda;
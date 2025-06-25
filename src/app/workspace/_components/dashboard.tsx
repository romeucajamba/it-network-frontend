"use client"
import React, { useState } from 'react';
import { ArrowLeft, Calendar, BarChart3, CheckSquare, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Project, Task } from './workSpace';
import {ProjectCalendar } from './calendar';
import {ProjectChart} from './chart';
import {TaskManager} from './taskManage';

interface ProjectDashboardProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  project,
  onBack,
  onUpdateProject
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const completedTasks = project.tasks.filter(task => task.status === 'done').length;
  const totalTasks = project.tasks.length;
  const tasksProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    };
    onUpdateProject({
      ...project,
      tasks: [...project.tasks, task]
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-600 text-white">
              {project.methodology.toUpperCase()}
            </Badge>
            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Progresso Geral</p>
                  <p className="text-2xl font-bold text-white">{project.progress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-3 rounded-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tarefas Concluídas</p>
                  <p className="text-2xl font-bold text-white">{completedTasks}/{totalTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-600 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Dias Restantes</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.ceil((new Date(project.expectedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tipo</p>
                  <p className="text-2xl font-bold text-white">Pessoal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-slate-700">
              <CheckSquare className="w-4 h-4 mr-2" />
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-slate-700">
              <Calendar className="w-4 h-4 mr-2" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Gráficos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Overview */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Progresso do Projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Progresso Geral</span>
                      <span className="text-sm text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Tarefas Concluídas</span>
                      <span className="text-sm text-white">{tasksProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={tasksProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Tasks */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Tarefas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.tasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center space-x-3">
                        <Checkbox
                          checked={task.status === 'done'}
                          onCheckedChange={(checked) =>
                            handleTaskUpdate(task.id, { 
                              status: checked ? 'done' : 'todo' 
                            })
                          }
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${task.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            Vence em: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge
                          variant={task.priority === 'high' ? 'destructive' : 
                                  task.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManager
              project={project}
              onTaskUpdate={handleTaskUpdate}
              onAddTask={handleAddTask}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <ProjectCalendar project={project} />
          </TabsContent>

          <TabsContent value="analytics">
            <ProjectChart project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

"use client"
import React, { useState } from 'react';
import { ArrowLeft, Users, Video, MessageSquare, FileText, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Project } from './workSpace';
import {TaskManager} from './taskManage';
import {ProjectCalendar} from './calendar';
import {ProjectChart} from './chart';
import {TeamChat} from './teamChat';
import {TeamFiles} from './teamFile';

interface TeamWorkspaceProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
}

export const TeamWorkspace: React.FC<TeamWorkspaceProps> = ({
  project,
  onBack,
  onUpdateProject
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTaskUpdate = (taskId: string, updates: any) => {
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    onUpdateProject({ ...project, tasks: updatedTasks });
  };

  const handleAddTask = (newTask: any) => {
    const task = {
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
          <div className="flex items-center space-x-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <Video className="w-4 h-4 mr-2" />
              Videochamada
            </Button>
            <Badge variant="secondary" className="bg-green-600 text-white">
              {project.methodology.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-gray-500 text-gray-300">
              {project.teamMembers?.length || 0} membros
            </Badge>
          </div>
        </div>

        {/* Team Members */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Equipe do Projeto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {project.teamMembers?.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                      {member.split('@')[0].substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-300">{member}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-gray-500 cursor-pointer text-gray-300 hover:bg-slate-700">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Membros</p>
                  <p className="text-2xl font-bold text-white">{project.teamMembers?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tarefas</p>
                  <p className="text-2xl font-bold text-white">{project.tasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Progresso</p>
                  <p className="text-2xl font-bold text-white">{project.progress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-600 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mensagens</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700 grid grid-cols-6 w-full">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700 text-white cursor-pointer">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-slate-700 text-white cursor-pointer">
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-slate-700 text-white cursor-pointer">
              Chat
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-slate-700 text-white cursor-pointer">
              Arquivos
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-slate-700 text-white cursor-pointer">
              Calendário
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700 text-white cursor-pointer">
              Gráficos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-medium">João</span> completou a tarefa Setup inicial
                        </p>
                        <p className="text-xs text-gray-400">2 horas atrás</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-green-600 text-white text-xs">MS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-medium">Maria</span> adicionou um novo arquivo
                        </p>
                        <p className="text-xs text-gray-400">4 horas atrás</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Próximos Prazos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.tasks
                      .filter(task => task.status !== 'done')
                      .slice(0, 3)
                      .map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                          <div>
                            <p className="text-sm text-white font-medium">{task.title}</p>
                            <p className="text-xs text-gray-400">
                              Vence: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Badge
                            variant={task.priority === 'high' ? 'destructive' : 
                                    task.priority === 'medium' ? 'default' : 'secondary'}
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

          <TabsContent value="chat">
            <TeamChat project={project} />
          </TabsContent>

          <TabsContent value="files">
            <TeamFiles project={project} />
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

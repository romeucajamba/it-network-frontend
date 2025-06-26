import React, { useState } from 'react';
import { Plus, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {CreateProjectModal} from './createProjectModal';
import {ProjectDashboard} from './dashboard';
import {TeamWorkspace} from './teamWorkSpace';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  expectedEndDate: string;
  status: 'active' | 'completed' | 'paused';
  type: 'personal' | 'team';
  progress: number;
  teamMembers?: string[];
  tasks: Task[];
  methodology: 'kanban' | 'scrum';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo?: string;
  tags: string[];
}

export const Workspace = () => {
  const [activeView, setActiveView] = useState<'overview' | 'personal' | 'team'>('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Desenvolvimento de plataforma de e-commerce moderna',
      startDate: '2024-01-15',
      expectedEndDate: '2024-06-15',
      status: 'active',
      type: 'personal',
      progress: 65,
      methodology: 'kanban',
      tasks: [
        {
          id: '1',
          title: 'Setup inicial do projeto',
          description: 'Configurar ambiente de desenvolvimento',
          status: 'done',
          priority: 'high',
          dueDate: '2024-01-20',
          tags: ['setup', 'backend']
        },
        {
          id: '2',
          title: 'Implementar autenticação',
          description: 'Sistema de login e registro',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-02-01',
          tags: ['auth', 'security']
        }
      ]
    },
    {
      id: '2',
      name: 'App Mobile Corporativo',
      description: 'Aplicativo para gestão de funcionários',
      startDate: '2024-02-01',
      expectedEndDate: '2024-08-01',
      status: 'active',
      type: 'team',
      progress: 30,
      methodology: 'scrum',
      teamMembers: ['joao@empresa.com', 'maria@empresa.com'],
      tasks: [
        {
          id: '3',
          title: 'Design do UI/UX',
          description: 'Criar protótipos e design system',
          status: 'in-progress',
          priority: 'medium',
          dueDate: '2024-02-15',
          assignedTo: 'maria@empresa.com',
          tags: ['design', 'ui']
        }
      ]
    }
  ]);

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'progress' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      progress: 0,
      tasks: []
    };
    setProjects([...projects, newProject]);
    setShowCreateModal(false);
  };

  if (selectedProject) {
    if (selectedProject.type === 'team') {
      return (
        <TeamWorkspace
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onUpdateProject={(updatedProject) => {
            setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
            setSelectedProject(updatedProject);
          }}
        />
      );
    } else {
      return (
        <ProjectDashboard
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onUpdateProject={(updatedProject) => {
            setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
            setSelectedProject(updatedProject);
          }}
        />
      );
    }
  }

  const personalProjects = projects.filter(p => p.type === 'personal');
  const teamProjects = projects.filter(p => p.type === 'team');

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Área de Trabalho</h1>
            <p className="text-gray-400">Gerencie seus projetos pessoais e colaborativos</p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeView === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveView('overview')}
            className="text-white cursor-pointer"
          >
            Visão Geral
          </Button>
          <Button
            variant={activeView === 'personal' ? 'default' : 'ghost'}
            onClick={() => setActiveView('personal')}
            className="text-white cursor-pointer"
          >
            <User className="w-4 h-4 mr-2" />
            Projetos Pessoais ({personalProjects.length})
          </Button>
          <Button
            variant={activeView === 'team' ? 'default' : 'ghost'}
            onClick={() => setActiveView('team')}
            className="text-white cursor-pointer"
          >
            <Users className="w-4 h-4 mr-2" />
            Projetos Colaborativos ({teamProjects.length})
          </Button>
        </div>

        {/* Content */}
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Projects Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Projetos Pessoais
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                  className="cursor-pointer border-blue-400 bg-blue-400 text-white hover:bg-blue-400 hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Criar
                </Button>
              </div>
              <div className="space-y-4">
                {personalProjects.map((project) => (
                  <Card key={project.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors">
                    <CardHeader onClick={() => setSelectedProject(project)}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{project.name}</CardTitle>
                        <Badge variant="secondary" className="bg-blue-600 text-white">
                          {project.methodology.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent onClick={() => setSelectedProject(project)}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progresso</span>
                        <span className="text-sm text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                        <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                        <span>Entrega: {new Date(project.expectedEndDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {personalProjects.length === 0 && (
                  <Card className="bg-slate-800 border-slate-700 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <User className="w-12 h-12 text-gray-500 mb-4" />
                      <p className="text-gray-400 mb-4">Nenhum projeto pessoal ainda</p>
                      <Button 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700"
                      >
                        Criar Primeiro Projeto
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Team Projects Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Projetos Colaborativos
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                  className="cursor-pointer border-green-400 bg-green-400 hover:bg-green-400 text-white hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Criar
                </Button>
              </div>
              <div className="space-y-4">
                {teamProjects.map((project) => (
                  <Card key={project.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors">
                    <CardHeader onClick={() => setSelectedProject(project)}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{project.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-600 text-white">
                            {project.methodology.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="border-gray-500 text-gray-300">
                            {project.teamMembers?.length || 0} membros
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent onClick={() => setSelectedProject(project)}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progresso</span>
                        <span className="text-sm text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                        <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                        <span>Entrega: {new Date(project.expectedEndDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {teamProjects.length === 0 && (
                  <Card className="bg-slate-800 border-slate-700 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="w-12 h-12 text-gray-500 mb-4" />
                      <p className="text-gray-400 mb-4">Nenhum projeto colaborativo ainda</p>
                      <Button 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-green-600 hover:bg-green-700 cursor-pointer"
                      >
                        Criar Primeiro Projeto
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project) => (
              <Card key={project.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors">
                <CardHeader onClick={() => setSelectedProject(project)}>
                  <CardTitle className="text-white">{project.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent onClick={() => setSelectedProject(project)}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Progresso</span>
                      <span className="text-sm text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {project.methodology.toUpperCase()}
                      </Badge>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeView === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamProjects.map((project) => (
              <Card key={project.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors">
                <CardHeader onClick={() => setSelectedProject(project)}>
                  <CardTitle className="text-white">{project.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent onClick={() => setSelectedProject(project)}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Progresso</span>
                      <span className="text-sm text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        {project.methodology.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {project.teamMembers?.length || 0} membros
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateProject}
        />
      </div>
    </div>
  );
};

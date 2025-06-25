"use client"
import React, { useState } from 'react';
import { Plus, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project, Task } from './workSpace';

interface TaskManagerProps {
  project: Project;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  project,
  onTaskUpdate,
  onAddTask
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    tags: [] as string[]
  });

  const filteredTasks = project.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      tags: []
    });
    setShowAddModal(false);
  };

  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    done: filteredTasks.filter(task => task.status === 'done')
  };

  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gerenciar Tarefas</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 cursor-pointer hover:bg-transparent  to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="todo">A Fazer</SelectItem>
                <SelectItem value="in-progress">Em Progresso</SelectItem>
                <SelectItem value="done">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
              <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      {project.methodology === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <Card key={status} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>
                    {status === 'todo' && 'A Fazer'}
                    {status === 'in-progress' && 'Em Progresso'}
                    {status === 'done' && 'Concluído'}
                  </span>
                  <Badge variant="secondary" className="bg-slate-700">
                    {tasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <Card key={task.id} className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="text-white font-medium">{task.title}</h4>
                          <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}></div>
                        </div>
                        
                        <p className="text-sm text-gray-400">{task.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <Select
                            value={task.status}
                            onValueChange={(value: Task['status']) => 
                              onTaskUpdate(task.id, { status: value })
                            }
                          >
                            <SelectTrigger className="w-[100px] h-8 bg-slate-600 border-slate-500 text-white text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-600 border-slate-500 cursor-pointer">
                              <SelectItem value="todo">A Fazer</SelectItem>
                              <SelectItem value="in-progress">Em Progresso</SelectItem>
                              <SelectItem value="done">Concluído</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View for Scrum */}
      {project.methodology === 'scrum' && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-4 hover:bg-slate-700 transition-colors">
                  <Checkbox
                    checked={task.status === 'done'}
                    onCheckedChange={(checked) =>
                      onTaskUpdate(task.id, { 
                        status: checked ? 'done' : 'todo' 
                      })
                    }
                  />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className={`font-medium ${task.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></div>
                    </div>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Vence: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                      {task.tags.length > 0 && (
                        <div className="flex space-x-1">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Select
                    value={task.status}
                    onValueChange={(value: Task['status']) => 
                      onTaskUpdate(task.id, { status: value })
                    }
                  >
                    <SelectTrigger className="w-[120px] bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="todo">A Fazer</SelectItem>
                      <SelectItem value="in-progress">Em Progresso</SelectItem>
                      <SelectItem value="done">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Task Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitTask} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => 
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Criar Tarefa
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="border-slate-600 text-gray-300 hover:bg-slate-700"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
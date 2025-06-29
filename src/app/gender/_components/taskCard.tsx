"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Clock,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle2,
  Circle,
  Paperclip,
  Link2,
  Bell,
  BellOff
} from 'lucide-react';
import { Task, TaskPriority, TaskType } from '@/types/agenda';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {CreateTaskModal} from './createTaskModal';

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard ({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
    }
  };

  const getPriorityText = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
    }
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

  const getTypeText = (type: TaskType) => {
    switch (type) {
      case 'meeting': return 'Reunião';
      case 'study': return 'Estudos';
      case 'exercise': return 'Exercício';
      case 'school': return 'Escola';
      case 'programming': return 'Programação';
      case 'other': return 'Outros';
    }
  };

  const toggleStatus = () => {
    onUpdate({
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed'
    });
  };

  const handleEdit = (updatedTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    onUpdate({
      ...updatedTask,
      id: task.id,
      createdAt: task.createdAt,
      updatedAt: new Date()
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setIsDeleteDialogOpen(false);
  };

  const scheduleNotification = () => {
    if ('Notification' in window) {
      // Solicitar permissão de notificação
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const taskDateTime = new Date(task.startDate);
          const [hours, minutes] = task.startTime.split(':');
          taskDateTime.setHours(parseInt(hours), parseInt(minutes));
          
          // Notificação 2 horas antes
          const notificationTime = new Date(taskDateTime.getTime() - 2 * 60 * 60 * 1000);
          const now = new Date();
          
          if (notificationTime > now) {
            const timeout = notificationTime.getTime() - now.getTime();
            setTimeout(() => {
              new Notification(`Lembrete: ${task.title}`, {
                body: `Sua atividade começará em 2 horas (${task.startTime})`,
                icon: '/favicon.ico'
              });
            }, timeout);
          }
        }
      });
    }
  };

  // Agendar notificação automaticamente se estiver habilitada
  React.useEffect(() => {
    if (notificationsEnabled && task.status === 'pending') {
      scheduleNotification();
    }
  }, [task, notificationsEnabled]);

  return (
    <>
      <Card className={`bg-slate-800 border-slate-700 transition-all hover:shadow-lg ${
        task.status === 'completed' ? 'opacity-75' : ''
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleStatus}
                className="p-0 h-auto cursor-pointer"
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-100" />
                )}
              </Button>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className={`font-semibold text-lg ${
                    task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  <span className="text-lg">{getTypeIcon(task.type)}</span>
                </div>
                
                {task.description && (
                  <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {getTypeText(task.type)}
                  </Badge>
                  
                  <Badge className={`text-xs text-white ${getPriorityColor(task.priority)}`}>
                    {getPriorityText(task.priority)}
                  </Badge>
                  
                  <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
                    {task.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(task.startDate, "dd/MM/yyyy", { locale: pt })}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{task.startTime} - {task.endTime}</span>
                  </div>
                </div>
                
                {/* Anexos e Links */}
                {(task.attachments.length > 0 || task.links.length > 0) && (
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                    {task.attachments.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Paperclip className="w-4 h-4" />
                        <span>{task.attachments.length} anexo(s)</span>
                      </div>
                    )}
                    
                    {task.links.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Link2 className="w-4 h-4" />
                        <span>{task.links.length} link(s)</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="p-2 cursor-pointer hover:bg-transparent"
              >
                {notificationsEnabled ? (
                  <Bell className="w-4 h-4 text-blue-500" />
                ) : (
                  <BellOff className="w-4 h-4 text-gray-400" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-transparent cursor-pointer">
                    <MoreHorizontal className="w-4 h-4 cursor-pointer text-gray-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-700 border-slate-600" align="end">
                  <DropdownMenuItem
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-white hover:bg-slate-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={toggleStatus}
                    className="text-white hover:bg-slate-600"
                  >
                    {task.status === 'completed' ? (
                      <>
                        <Circle className="w-4 h-4 mr-2" />
                        Marcar como Pendente
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Marcar como Concluído
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-600" />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-red-400 hover:bg-slate-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Links anexados */}
          {task.links.length > 0 && (
            <div className="space-y-1">
              {task.links.slice(0, 3).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm block"
                >
                  🔗 {link.title}
                </a>
              ))}
              {task.links.length > 3 && (
                <span className="text-gray-400 text-sm">
                  +{task.links.length - 3} mais link(s)
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <CreateTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        selectedDate={task.startDate}
        editTask={task}
      />

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Tem certeza que deseja excluir a atividade {task.title}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

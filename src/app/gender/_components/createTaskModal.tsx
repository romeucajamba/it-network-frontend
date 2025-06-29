"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CalendarIcon, Upload, Link2, X } from 'lucide-react';
import { Task, TaskType, TaskPriority, TaskAttachment, TaskLink } from '@/types/agenda';
import { cn } from '@/lib/utils';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  selectedDate: Date;
  editTask?: Task;
}

export function CreateTaskModal ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  editTask
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: editTask?.title || '',
    description: editTask?.description || '',
    type: editTask?.type || 'other' as TaskType,
    priority: editTask?.priority || 'medium' as TaskPriority,
    startDate: editTask?.startDate || selectedDate,
    endDate: editTask?.endDate || selectedDate,
    startTime: editTask?.startTime || '09:00',
    endTime: editTask?.endTime || '10:00',
  });

  const [attachments, setAttachments] = useState<TaskAttachment[]>(editTask?.attachments || []);
  const [links, setLinks] = useState<TaskLink[]>(editTask?.links || []);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    onSubmit({
      ...formData,
      status: editTask?.status || 'pending',
      attachments,
      links
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      type: 'other',
      priority: 'medium',
      startDate: selectedDate,
      endDate: selectedDate,
      startTime: '09:00',
      endTime: '10:00',
    });
    setAttachments([]);
    setLinks([]);
    setNewLink({ title: '', url: '' });
    
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const attachment: TaskAttachment = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file) // Em produção, fazer upload real
        };
        setAttachments(prev => [...prev, attachment]);
      });
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const link: TaskLink = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url
      };
      setLinks(prev => [...prev, link]);
      setNewLink({ title: '', url: '' });
    }
  };

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editTask ? 'Editar Atividade' : 'Nova Atividade'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite o título da atividade"
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-200">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva os detalhes da atividade"
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />
          </div>

          {/* Tipo e Prioridade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-200">Tipo de Atividade</Label>
              <Select
                value={formData.type}
                onValueChange={(value: TaskType) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="meeting">
                    <div className="flex items-center">
                      <span className="mr-2">👥</span>
                      Reunião
                    </div>
                  </SelectItem>
                  <SelectItem value="study">
                    <div className="flex items-center">
                      <span className="mr-2">📚</span>
                      Estudos
                    </div>
                  </SelectItem>
                  <SelectItem value="exercise">
                    <div className="flex items-center">
                      <span className="mr-2">💪</span>
                      Exercício Físico
                    </div>
                  </SelectItem>
                  <SelectItem value="school">
                    <div className="flex items-center">
                      <span className="mr-2">🎓</span>
                      Escola
                    </div>
                  </SelectItem>
                  <SelectItem value="programming">
                    <div className="flex items-center">
                      <span className="mr-2">💻</span>
                      Programação
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center">
                      <span className="mr-2">📝</span>
                      Outros
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-200">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: TaskPriority) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="high">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Alta
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      Média
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Baixa
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-200">Data de Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-slate-700 border-slate-600 cursor-pointer text-white",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP", { locale: pt }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, startDate: date }))}
                    initialFocus
                    className="bg-slate-700"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-200">Data de Término</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-slate-700 cursor-pointer border-slate-600 text-white",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP", { locale: pt }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, endDate: date }))}
                    initialFocus
                    className="bg-slate-700"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Horários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-gray-200">Hora de Início</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-gray-200">Hora de Término</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Upload de Arquivos */}
          <div className="space-y-2">
            <Label className="text-gray-200">Anexos</Label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-400">Clique para adicionar arquivos</span>
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                    <span className="text-sm text-gray-200">{attachment.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(attachment.id)}
                      className='cursor-pointer'
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-2">
            <Label className="text-gray-200">Links</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Título do link"
                  value={newLink.title}
                  onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  placeholder="URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Button type="button" onClick={addLink} variant="outline" className='cursor-pointer'>
                  <Link2 className="w-4 h-4" />
                </Button>
              </div>

              {links.length > 0 && (
                <div className="space-y-2">
                  {links.map((link) => (
                    <div key={link.id} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {link.title}
                      </a>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(link.id)}
                        className='cursor-pointer'
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recursos para Programadores */}
          {formData.type === 'programming' && (
            <div className="space-y-4 p-4 bg-slate-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Recursos para Programação</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setLinks(prev => [...prev, {
                    id: Date.now().toString(),
                    title: 'GitHub',
                    url: 'https://github.com'
                  }])}
                  className='cursor-pointer'
                >
                  GitHub
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setLinks(prev => [...prev, {
                    id: Date.now().toString(),
                    title: 'Stack Overflow',
                    url: 'https://stackoverflow.com'
                  }])}
                  className='cursor-pointer'
                >
                  Stack Overflow
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setLinks(prev => [...prev, {
                    id: Date.now().toString(),
                    title: 'MDN Docs',
                    url: 'https://developer.mozilla.org'
                  }])}
                  className='cursor-pointer'
                >
                  MDN Docs
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setLinks(prev => [...prev, {
                    id: Date.now().toString(),
                    title: 'VS Code',
                    url: 'https://code.visualstudio.com'
                  }])}
                  className='cursor-pointer'
                >
                  VS Code
                </Button>
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className='cursor-pointer'>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              {editTask ? 'Atualizar' : 'Criar'} Atividade
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

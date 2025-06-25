"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Users } from 'lucide-react';
import { Project } from './workSpace';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'progress' | 'tasks'>) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    expectedEndDate: '',
    type: 'personal' as 'personal' | 'team',
    methodology: 'kanban' as 'kanban' | 'scrum',
    teamMembers: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'active' as const
    });
    setFormData({
      name: '',
      description: '',
      startDate: '',
      expectedEndDate: '',
      type: 'personal',
      methodology: 'kanban',
      teamMembers: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tipo de Projeto</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value: 'personal' | 'team') => 
                setFormData({ ...formData, type: value })
              }
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" className='text-blue-500'/>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  <span>Projeto Particular</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team" className='text-blue-500'/>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Users className="w-4 h-4" />
                  <span>Projeto Colaborativo</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome do projeto"
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o projeto..."
              className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedEndDate">Data Prevista de Entrega</Label>
              <Input
                id="expectedEndDate"
                type="date"
                value={formData.expectedEndDate}
                onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          {/* Methodology */}
          <div className="space-y-2">
            <Label>Metodologia</Label>
            <Select
              value={formData.methodology}
              onValueChange={(value: 'kanban' | 'scrum') => 
                setFormData({ ...formData, methodology: value })
              }
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="kanban">Kanban</SelectItem>
                <SelectItem value="scrum">Scrum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r cursor-pointer from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Criar Projeto
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-red-600 cursor-pointer hover:text-white text-white bg-red-600 hover:bg-red-600"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

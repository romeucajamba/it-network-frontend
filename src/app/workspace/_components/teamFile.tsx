"use client"
import React, { useState } from 'react';
import { Upload, File, FileText, Image, Video, Download, Trash2, Search, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from './workSpace';

interface TeamFilesProps {
  project: Project;
}

interface ProjectFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  category: 'design' | 'code' | 'documentation' | 'assets' | 'other';
}

export const TeamFiles: React.FC<TeamFilesProps> = () => {
  const [files, ] = useState<ProjectFile[]>([
    {
      id: '1',
      name: 'API_Documentation.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadedBy: 'joao@empresa.com',
      uploadedAt: '2024-01-20',
      category: 'documentation'
    },
    {
      id: '2',
      name: 'design_mockups.zip',
      type: 'other',
      size: '15.7 MB',
      uploadedBy: 'maria@empresa.com',
      uploadedAt: '2024-01-19',
      category: 'design'
    },
    {
      id: '3',
      name: 'logo.png',
      type: 'image',
      size: '500 KB',
      uploadedBy: 'maria@empresa.com',
      uploadedAt: '2024-01-18',
      category: 'assets'
    },
    {
      id: '4',
      name: 'demo_video.mp4',
      type: 'video',
      size: '45.2 MB',
      uploadedBy: 'joao@empresa.com',
      uploadedAt: '2024-01-17',
      category: 'other'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    const matchesType = filterType === 'all' || file.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'design':
        return 'bg-purple-600';
      case 'code':
        return 'bg-green-600';
      case 'documentation':
        return 'bg-blue-600';
      case 'assets':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Arquivos do Projeto</h2>
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
          <Upload className="w-4 h-4 mr-2" />
          Enviar Arquivo
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
                  placeholder="Buscar arquivos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="code">Código</SelectItem>
                <SelectItem value="documentation">Documentação</SelectItem>
                <SelectItem value="assets">Assets</SelectItem>
                <SelectItem value="other">Outros</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="document">Documentos</SelectItem>
                <SelectItem value="image">Imagens</SelectItem>
                <SelectItem value="video">Vídeos</SelectItem>
                <SelectItem value="other">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{file.name}</h4>
                      <p className="text-sm text-gray-400">{file.size}</p>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(file.category)} text-white`}>
                    {file.category}
                  </Badge>
                </div>

                <div className="text-xs text-gray-400">
                  <p>Por: {file.uploadedBy.split('@')[0]}</p>
                  <p>{new Date(file.uploadedAt).toLocaleDateString('pt-BR')}</p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-400 cursor-pointer hover:text-white hover:bg-slate-700"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Baixar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 cursor-pointer hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <File className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400 mb-4">
              {searchTerm || filterCategory !== 'all' || filterType !== 'all'
                ? 'Nenhum arquivo encontrado com os filtros aplicados'
                : 'Nenhum arquivo enviado ainda'
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Enviar Primeiro Arquivo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

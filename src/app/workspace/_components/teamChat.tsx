"use client"
import React, { useState } from 'react';
import { Send, Paperclip, Mic, Video, Phone, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Project } from './workSpace';

interface TeamChatProps {
  project: Project;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'audio';
  fileUrl?: string;
  fileName?: string;
}

export const TeamChat: React.FC<TeamChatProps> = ({ project }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'joao@empresa.com',
      content: 'Bom dia pessoal! Como está o progresso da tarefa de autenticação?',
      timestamp: '09:30',
      type: 'text'
    },
    {
      id: '2',
      sender: 'maria@empresa.com',
      content: 'Oi João! Estou finalizando os testes. Deve ficar pronto até o final do dia.',
      timestamp: '09:35',
      type: 'text'
    },
    {
      id: '3',
      sender: 'joao@empresa.com',
      content: 'Perfeito! Vou compartilhar a documentação da API.',
      timestamp: '09:36',
      type: 'text'
    },
    {
      id: '4',
      sender: 'joao@empresa.com',
      content: 'API_Documentation.pdf',
      timestamp: '09:37',
      type: 'file',
      fileName: 'API_Documentation.pdf'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'you@empresa.com',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Team Members List */}
      <Card className="bg-slate-800 border-slate-700 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-white text-sm">Membros Online</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {project.teamMembers?.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                      {member.split('@')[0].substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{member.split('@')[0]}</p>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="bg-slate-800 border-slate-700 lg:col-span-3 flex flex-col">
        <CardHeader className="border-b border-slate-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Chat da Equipe</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'you@empresa.com' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[70%] ${
                    message.sender === 'you@empresa.com' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {message.sender !== 'you@empresa.com' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                          {message.sender.split('@')[0].substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'you@empresa.com' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                        : 'bg-slate-700 text-gray-200'
                    }`}>
                      {message.sender !== 'you@empresa.com' && (
                        <p className="text-xs text-gray-400 mb-1">
                          {message.sender.split('@')[0]}
                        </p>
                      )}
                      
                      {message.type === 'file' ? (
                        <div className="flex items-center space-x-2">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm">{message.fileName}</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        {/* Message Input */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white cursor-pointer hover:bg-transparent ">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white cursor-pointer hover:bg-transparent ">
              <Smile className="w-4 h-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-slate-700 border-slate-600 text-white"
            />
            <Button variant="ghost" size="icon" className="text-gray-400 cursor-pointer hover:bg-transparent hover:text-white">
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

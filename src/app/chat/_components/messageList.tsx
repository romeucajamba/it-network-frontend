import React from 'react';
import { Play, Download, FileText } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from './chat';

interface MessageListProps {
  messages: Message[];
  onMediaClick: (url: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, onMediaClick }) => {
  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'audio':
        return (
          <div className="bg-slate-600 rounded-lg p-3 flex items-center space-x-3 max-w-xs">
            <Button size="icon" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-8 h-8">
              <Play className="w-3 h-3" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center space-x-1 mb-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full ${
                      i < 8 ? 'bg-green-400 h-4' : 'bg-gray-400 h-2'
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-xs text-gray-300">{message.duration}</span>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div 
            className="cursor-pointer rounded-lg overflow-hidden max-w-xs"
            onClick={() => message.fileUrl && onMediaClick(message.fileUrl)}
          >
            <img 
              src={message.fileUrl} 
              alt="Shared image"
              className="w-full h-auto hover:opacity-90 transition-opacity"
            />
          </div>
        );
      
      case 'video':
        return (
          <div 
            className="relative cursor-pointer rounded-lg overflow-hidden max-w-xs"
            onClick={() => message.fileUrl && onMediaClick(message.fileUrl)}
          >
            <video className="w-full h-auto">
              <source src={message.fileUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="bg-slate-600 rounded-lg p-3 flex items-center space-x-3 max-w-xs">
            <FileText className="w-8 h-8 text-blue-400" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">{message.fileName}</p>
              <p className="text-gray-400 text-xs">Documento</p>
            </div>
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white w-8 h-8">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );
      
      default:
        return <p className="text-gray-200">{message.content}</p>;
    }
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[70%] ${
              message.isOwn ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {!message.isOwn && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                    {message.senderName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`rounded-2xl p-3 ${
                message.isOwn 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                  : 'bg-slate-700 text-gray-200'
              }`}>
                {renderMessageContent(message)}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

"use client"
import React from 'react';
import { Phone, Video, MoreHorizontal, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Contact } from './chat';

interface ChatHeaderProps {
  contact: Contact;
  onVideoCall: () => void;
  onVoiceCall: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  contact,
  onVideoCall,
  onVoiceCall
}) => {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {contact.isGroup ? (
                <Users className="w-5 h-5" />
              ) : (
                contact.name.split(' ').map(n => n[0]).join('')
              )}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-lg font-semibold text-white">{contact.name}</h2>
            <div className="flex items-center space-x-1">
              {contact.isGroup ? (
                <span className="text-sm text-gray-400">
                  {contact.members?.length} membros
                </span>
              ) : (
                <>
                  <div className={`w-2 h-2 rounded-full ${contact.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span className="text-sm text-gray-400">
                    {contact.isOnline ? 'Online' : 'Última vez há 2h'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            onClick={onVoiceCall}
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <Phone className="w-5 h-5" />
          </Button>
          
          <Button 
            onClick={onVideoCall}
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <Video className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
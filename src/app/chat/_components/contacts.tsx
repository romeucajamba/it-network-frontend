"use client"
import React from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Contact } from './chat';

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  onCreateGroup: () => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
  onCreateGroup
}) => {
  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">DevChat</h1>
          <Button 
            onClick={onCreateGroup}
            size="icon" 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Buscar conversas..." 
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedContact?.id === contact.id 
                  ? 'bg-slate-700' 
                  : 'hover:bg-slate-700/50'
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {contact.isGroup ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      contact.name.split(' ').map(n => n[0]).join('')
                    )}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && !contact.isGroup && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                )}
                {contact.isGroup && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                    <Users className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">{contact.name}</h3>
                  <span className="text-xs text-gray-400">{contact.timestamp}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                {contact.isGroup && contact.members && (
                  <p className="text-xs text-gray-500 truncate">
                    {contact.members.length} membros
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

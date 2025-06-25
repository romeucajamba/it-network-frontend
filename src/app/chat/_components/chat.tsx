"use client"
import React, { useState } from 'react';
import {ChatHeader} from './chatHeader';
import {ContactList} from './contacts';
import {MessageList} from './messageList';
import {MessageInput} from './messageInput';
import {GroupModal} from './groupModal';
import {MediaViewer} from './mediaViewr';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  isGroup?: boolean;
  members?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'audio' | 'video' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  duration?: string;
  isOwn: boolean;
}

export const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string>('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'React Developers',
      avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png',
      lastMessage: 'João: Alguém conhece uma boa lib para charts?',
      timestamp: '14:30',
      isOnline: true,
      isGroup: true,
      members: ['João Silva', 'Maria Santos', 'Pedro Costa']
    },
    {
      id: '2',
      name: 'Ana Carolina',
      avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png',
      lastMessage: 'Vamos marcar aquela call sobre o projeto?',
      timestamp: '13:45',
      isOnline: true
    },
    {
      id: '3',
      name: 'JavaScript Brasil',
      avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png',
      lastMessage: 'Carlos: ES2024 features são incríveis!',
      timestamp: '12:20',
      isOnline: false,
      isGroup: true,
      members: ['Carlos Lima', 'Rafael Souza', 'Luciana Oliveira']
    },
    {
      id: '4',
      name: 'Bruno Tech',
      avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png',
      lastMessage: 'Áudio de 0:45',
      timestamp: '11:15',
      isOnline: true
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Ana Carolina',
      content: 'Oi! Como está o desenvolvimento do projeto?',
      timestamp: '13:30',
      type: 'text',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'Você',
      content: 'Está indo bem! Acabei de implementar a autenticação.',
      timestamp: '13:32',
      type: 'text',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Ana Carolina',
      content: 'Perfeito! Podemos fazer uma call para revisar?',
      timestamp: '13:35',
      type: 'audio',
      duration: '0:15',
      isOwn: false
    },
    {
      id: '4',
      senderId: 'me',
      senderName: 'Você',
      content: 'Claro! Que tal às 15h?',
      timestamp: '13:40',
      type: 'text',
      isOwn: true
    }
  ];

  const handleMediaClick = (url: string) => {
    setSelectedMedia(url);
    setShowMediaViewer(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <ContactList 
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
        onCreateGroup={() => setShowGroupModal(true)}
      />

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <ChatHeader 
              contact={selectedContact}
              onVideoCall={() => console.log('Video call')}
              onVoiceCall={() => console.log('Voice call')}
            />
            
            <MessageList 
              messages={messages}
              onMediaClick={handleMediaClick}
            />
            
            <MessageInput 
              onSendMessage={(message) => console.log('Send:', message)}
              onSendAudio={(audio) => console.log('Send audio:', audio)}
              onSendFile={(file) => console.log('Send file:', file)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">💬</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">Selecione uma conversa</h2>
              <p>Escolha uma conversa para começar a trocar mensagens</p>
            </div>
          </div>
        )}
      </div>

      {showGroupModal && (
        <GroupModal 
          onClose={() => setShowGroupModal(false)}
          onCreateGroup={(group) => {
            console.log('Create group:', group);
            setShowGroupModal(false);
          }}
        />
      )}

      {showMediaViewer && (
        <MediaViewer 
          mediaUrl={selectedMedia}
          onClose={() => setShowMediaViewer(false)}
        />
      )}
    </div>
  );
};
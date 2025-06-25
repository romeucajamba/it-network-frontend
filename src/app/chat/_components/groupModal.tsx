import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GroupModalProps {
  onClose: () => void;
  onCreateGroup: (group: { name: string; members: string[] }) => void;
}

export const GroupModal: React.FC<GroupModalProps> = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const availableContacts = [
    { id: '1', name: 'Ana Carolina', avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png' },
    { id: '2', name: 'Bruno Tech', avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png' },
    { id: '3', name: 'Carlos Lima', avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png' },
    { id: '4', name: 'Diana Silva', avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png' },
    { id: '5', name: 'Eduardo Santos', avatar: '/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png' }
  ];

  const filteredContacts = availableContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreateGroup({
        name: groupName,
        members: selectedMembers
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Criar Grupo</h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Grupo
            </label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Digite o nome do grupo..."
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adicionar Membros ({selectedMembers.length} selecionados)
            </label>
            
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar contatos..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              />
            </div>

            <ScrollArea className="h-48">
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => toggleMember(contact.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMembers.includes(contact.id)
                        ? 'bg-blue-500/20 border border-blue-500'
                        : 'hover:bg-slate-700'
                    }`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{contact.name}</h3>
                    </div>
                    
                    {selectedMembers.includes(contact.id) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Plus className="w-3 h-3 text-white rotate-45" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-slate-700">
          <Button onClick={onClose} variant="ghost" className="text-gray-400">
            Cancelar
          </Button>
          <Button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedMembers.length === 0}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            Criar Grupo
          </Button>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  isConnected?: boolean;
}

const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Você', 
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
    bio: 'Seu perfil'
  },
  { 
    id: '2', 
    name: 'Ana Silva', 
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    bio: 'Desenvolvedora Frontend apaixonada por tecnologia',
    isConnected: true
  },
  { 
    id: '3', 
    name: 'Carlos Santos', 
    avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=face',
    bio: 'Designer UX/UI com foco em experiência do usuário',
    isConnected: false
  },
  { 
    id: '4', 
    name: 'Marina Costa', 
    avatar: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=150&h=150&fit=crop&crop=face',
    bio: 'Gerente de projetos e entusiasta de metodologias ágeis',
    isConnected: true
  },
  { 
    id: '5', 
    name: 'Pedro Oliveira', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Desenvolvedor Backend especializado em Node.js',
    isConnected: false
  },
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const currentUserId = '1';

  const searchUsers = (searchTerm: string): User[] => {
    if (!searchTerm.trim()) return [];
    
    return users.filter(user => 
      user.id !== currentUserId && 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const connectToUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isConnected: true } : user
      )
    );
  };

  const disconnectFromUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isConnected: false } : user
      )
    );
  };

  return {
    users,
    currentUserId,
    searchUsers,
    getUserById,
    connectToUser,
    disconnectFromUser,
  };
};

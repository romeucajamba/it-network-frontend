import { useState } from 'react';
import { Story, StoryGroup, User } from '@/types/story';

// Mock data para demonstração
const mockUsers: User[] = [
  { id: '1', name: 'Você', avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face' },
  { id: '2', name: 'Ana Silva', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face' },
  { id: '3', name: 'Carlos Santos', avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=face' },
  { id: '4', name: 'Marina Costa', avatar: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=150&h=150&fit=crop&crop=face' },
];

const mockStories: Story[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Ana Silva',
    userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    content: 'Que dia lindo! ☀️',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    viewed: false,
  },
  {
    id: '2',
    userId: '3',
    userName: 'Carlos Santos',
    userAvatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=face',
    content: 'Trabalhando duro! 💪',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
    viewed: false,
  },
  {
    id: '3',
    userId: '4',
    userName: 'Marina Costa',
    userAvatar: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=150&h=150&fit=crop&crop=face',
    content: 'Novo gatinho da família! 🐱',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000),
    viewed: true,
  },
];

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [myStories, setMyStories] = useState<Story[]>([]);
  const currentUser = mockUsers[0];

  const addStory = (content: string, image?: string) => {
    const newStory: Story = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      image,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      viewed: false,
    };

    setMyStories(prev => [newStory, ...prev]);
  };

  const markAsViewed = (storyId: string) => {
    setStories(prev => 
      prev.map(story => 
        story.id === storyId ? { ...story, viewed: true } : story
      )
    );
  };

  const getStoryGroups = (): StoryGroup[] => {
    const groupedStories = new Map<string, StoryGroup>();

    // Adicionar stories próprios se existirem
    if (myStories.length > 0) {
      groupedStories.set(currentUser.id, {
        user: currentUser,
        stories: myStories,
        hasUnseenStories: false,
      });
    }

    // Agrupar stories por usuário
    stories.forEach(story => {
      if (!groupedStories.has(story.userId)) {
        const user = mockUsers.find(u => u.id === story.userId) || {
          id: story.userId,
          name: story.userName,
          avatar: story.userAvatar,
        };

        groupedStories.set(story.userId, {
          user,
          stories: [],
          hasUnseenStories: false,
        });
      }

      groupedStories.get(story.userId)!.stories.push(story);
    });

    // Calcular se há stories não vistos
    groupedStories.forEach(group => {
      group.hasUnseenStories = group.stories.some(story => !story.viewed);
    });

    return Array.from(groupedStories.values());
  };

  return {
    storyGroups: getStoryGroups(),
    currentUser,
    addStory,
    markAsViewed,
  };
};
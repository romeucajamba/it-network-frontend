// stores/useProfileStore.ts
import { create } from 'zustand';
import { ProfileData } from '@/types/types';

interface ProfileStore {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const defaultProfile: ProfileData = {
  name: 'Romeu Cajamba',
  headline: 'Engenheiro de Software Full Stack | React, Node.js, Python',
  location: 'Luanda, Angola',
  connections: 1209,
  about: 'Desenvolvedor apaixonado por tecnologia com mais de 3 anos de experiência...',
  experience: [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Angola',
      duration: '2022 - Presente',
      description: 'Desenvolvimento de aplicações web modernas usando React, Node.js e PostgreSQL.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Bacharelado em Engenharia de Software',
      institution: 'Universidade Agostinho Neto',
      year: '2018 - 2022',
      description: 'Foco em desenvolvimento de software, algoritmos e estruturas de dados.'
    }
  ],
  skills: ['React', 'Node.js', 'Python', 'TypeScript'],
  contact: {
    email: 'romeu.cajamba@email.com',
    phone: '+244 999 999 999',
    website: 'romeucajamba.dev'
  }
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profileData: defaultProfile,
  setProfileData: (data) => set({ profileData: data }),
}));

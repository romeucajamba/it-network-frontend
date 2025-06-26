export type Notification = {
  id_notficacao_entidade: number;
  descricao_notificado: string;
  data_notificada: string;
  leitura: string
}

// types/profile.ts
export interface ProfileData {
  name: string;
  headline: string;
  location: string;
  connections: number; // ← adicionado aqui
  about: string;
  experience: Array<{
    id: number;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: number;
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  skills: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}
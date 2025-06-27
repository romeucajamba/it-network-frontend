
export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  createdAt: Date;
  expiresAt: Date;
  viewed: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface StoryGroup {
  user: User;
  stories: Story[];
  hasUnseenStories: boolean;
}
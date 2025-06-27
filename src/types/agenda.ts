export type TaskType = 'meeting' | 'study' | 'exercise' | 'school' | 'programming' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface TaskAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface TaskLink {
  id: string;
  title: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  attachments: TaskAttachment[];
  links: TaskLink[];
  createdAt: Date;
  updatedAt: Date;
}
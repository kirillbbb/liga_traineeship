// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

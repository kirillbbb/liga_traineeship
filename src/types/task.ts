import { paths, components } from './generated.d';

export type Task = components['schemas']['Task'];

export type CreateTaskDto = components['schemas']['CreateTaskDto'];

export type UpdateTaskDto = components['schemas']['UpdateTaskDto'];

export type GetTasksParams = paths['/tasks']['get']['parameters']['query'];

export type TaskFormValues = {
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
};

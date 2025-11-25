import { createApi } from '@reduxjs/toolkit/query/react';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';
import { axiosBaseQuery } from './axiosBase';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Tasks'],

  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({ url: 'tasks', method: 'GET' }),
      providesTags: ['Tasks'],
    }),

    addTask: builder.mutation<Task, CreateTaskDto>({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation<Task, { id: string; data: UpdateTaskDto }>({
      query: ({ id, data }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;

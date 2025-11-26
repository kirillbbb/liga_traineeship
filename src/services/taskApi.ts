import { api } from './api';
import { Task, CreateTaskDto, UpdateTaskDto, GetTasksParams } from 'types/task';

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksParams>({
      query: (params) => ({
        url: '/tasks',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), { type: 'Task', id: 'LIST' }]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    createTask: builder.mutation<Task, CreateTaskDto>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTask: builder.mutation<Task, { id: string; body: UpdateTaskDto }>({
      query: ({ id, body }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),

    getTask: builder.query<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
} = taskApi;

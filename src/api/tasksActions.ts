import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task, TaskFormValues, GetTasksParams, APIQueryParams } from './tasksApi';

const BASE_URL = 'https://tasks-service-maks1394.amvera.io';

export const fetchTasks = createAsyncThunk<Task[], GetTasksParams>(
  'tasks/fetchTasks',
  async (filters, { rejectWithValue }) => {
    const paramsToSend: APIQueryParams = {
      name_like: filters.name_like,

      isCompleted:
        filters.isCompleted !== undefined && filters.isCompleted !== null ? String(filters.isCompleted) : undefined,

      isImportant:
        filters.isImportant !== undefined && filters.isImportant !== null ? String(filters.isImportant) : undefined,
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(paramsToSend).filter(([, value]) => value !== undefined && value !== null)
    );

    try {
      const response = await axios.get<Task[]>(`${BASE_URL}/tasks`, {
        params: cleanedParams,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || 'Failed to fetch tasks');
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);

export const createTask = createAsyncThunk<Task, TaskFormValues>(
  'tasks/createTask',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || 'Failed to create task');
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);

export const deleteTask = createAsyncThunk<string, string>('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data || 'Failed to delete task');
    }
    return rejectWithValue('An unknown error occurred.');
  }
});

export const updateTask = createAsyncThunk<Task, { id: string; body: Partial<TaskFormValues> }>(
  'tasks/updateTask',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/tasks/${id}`, body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || 'Failed to update task');
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);

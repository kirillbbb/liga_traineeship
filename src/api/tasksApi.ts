import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, createTask, deleteTask, updateTask } from './tasksActions';

export interface TaskFormValues {
  name: string;
  info: string;
  isCompleted?: boolean;
  isImportant?: boolean;
}
export interface Task extends TaskFormValues {
  id: string;
}
export interface FiltersState {
  search: string;
  isCompleted?: boolean | null;
  isImportant?: boolean | null;
}
export interface GetTasksParams extends Partial<FiltersState> {
  name_like?: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialTaskState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialTaskState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to load tasks.';
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload; // Заменяем задачу обновленной версией
      }
    });
  },
});

export const taskReducer = taskSlice.reducer;

const initialFiltersState: FiltersState = {
  search: '',
  isCompleted: null,
  isImportant: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFiltersState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsCompleted: (state, action: PayloadAction<boolean | null>) => {
      state.isCompleted = action.payload;
    },
    setIsImportant: (state, action: PayloadAction<boolean | null>) => {
      state.isImportant = action.payload;
    },
    resetFilters: () => initialFiltersState,
  },
});

export const { setSearch, setIsCompleted, setIsImportant, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // ✅ Task Slice
    filters: filtersReducer, // ✅ Filters Slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

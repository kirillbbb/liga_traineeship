import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '../../api/tasksApi';
import logger from './middlewares/logger';
import debug from './middlewares/debug';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware, logger, debug),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

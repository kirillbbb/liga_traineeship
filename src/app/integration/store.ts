import { configureStore } from '@reduxjs/toolkit';

// Импорт базового API среза
import { api } from '../../services/api';
import filterReducer from './filterSlice';

import logger from './middlewares/logger';
import debug from './middlewares/debug';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, logger, debug),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

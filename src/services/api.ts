import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/axiosBase';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({}),
  tagTypes: ['Task'],
  endpoints: () => ({}),
});

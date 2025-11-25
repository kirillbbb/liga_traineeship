import axios, { AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';

const api = axios.create({
  baseURL: 'https://tasks-service-maks1394.amvera.io/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = {
      baseUrl: '',
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url: baseUrl + url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

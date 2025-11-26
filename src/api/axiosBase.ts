import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://tasks-service-maks1394.amvera.io/';

const api = axios.create({
  baseURL: BASE_URL,
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
        url: url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (err) {
      const axiosError = err as AxiosError; // ✅ Используем AxiosError для доступа к response

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

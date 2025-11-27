import React from 'react';

export interface LoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
  variant?: 'circle' | 'dot';
}

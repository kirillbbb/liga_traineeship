import React from 'react';
import './PageContainer.css';
import { PageContainerProps } from './PageContainer.types';

export function PageContainer({ children, className = '', title }: PageContainerProps) {
  return (
    <div className={`todo ${className}`}>
      {title && <h1 className="page-title">{title}</h1>}

      {children}
    </div>
  );
}

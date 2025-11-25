import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // 👈 Импортируем наш корневой компонент

const container = document.getElementById('root');

if (!container) {
  throw new Error('Корневой элемент с id "root" не найден в index.html');
}

const root = createRoot(container);

root.render(<App />);

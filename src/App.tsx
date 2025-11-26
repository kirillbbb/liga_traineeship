import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';

import TaskEditPage from './pages/TaskEditPage';
import TaskListPage from './pages/TaskListPage';
import { store } from 'app/integration/store';

const App = () => {
  return (
    // 1. Redux Provider
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<TaskListPage />} />

            <Route path="/tasks/edit/:id" element={<TaskEditPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

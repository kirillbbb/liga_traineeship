import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';

import TaskEditPage from './pages/TaskEditPage';
import TaskListPage from './pages/TaskListPage';


const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;

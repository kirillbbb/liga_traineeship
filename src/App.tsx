import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { store } from './app/integration/store';

import TaskEdit from './app/taskEdit/TaskEdit';
import TaskList from 'app/taskList/TaskList';

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/edit/:id" element={<TaskEdit />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

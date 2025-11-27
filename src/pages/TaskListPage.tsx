import React from 'react';

import TaskList from 'app/taskList/TaskList';
import TaskFilters from 'app/taskList/components/TaskFilters';

import { PageContainer } from 'components/PageContainer';

const TaskListPage: React.FC = () => {
  return (
    <PageContainer>
      <h1 className="mb-4">To Do List</h1>
      <div className="mb-4">
        <TaskFilters />
      </div>
      <div className="todo-list-section">
        <TaskList />
      </div>
    </PageContainer>
  );
};

export default TaskListPage;

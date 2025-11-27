import React from 'react';

import TaskList from 'app/taskList/TaskList';
import TaskFilters from 'app/taskList/components/TaskFilters';
// 🛑 УДАЛЕН ИМПОРТ TaskAdd, так как он используется внутри TaskFilters
// import { TaskAdd } from 'app/taskAdd/TaskAdd';
import { PageContainer } from 'components/PageContainer';

const TaskListPage: React.FC = () => {
  return (
    <PageContainer>
      <h1 className="mb-4">Task Management</h1>

      {/* 🛑 УДАЛЕН БЛОК С ЯВНОЙ КНОПКОЙ TaskAdd!
          Она теперь рендерится внутри TaskFilters.
      */}
      {/* <div className="mb-4">
        <TaskAdd />
      </div> */}

      <div className="mb-4">
        <TaskFilters /> {/* 👈 КНОПКА РЕНДЕРИТСЯ ВНУТРИ TaskFilters */}
      </div>
      <div className="todo-list-section">
        <TaskList />
      </div>
    </PageContainer>
  );
};

export default TaskListPage;

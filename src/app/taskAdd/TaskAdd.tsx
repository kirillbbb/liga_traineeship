import React, { useState } from 'react';
import TaskForm from './components/TaskForm';

import { useAddTaskMutation } from 'api/tasksApi';
import { CreateTaskDto } from 'types/task';
import { Loader } from 'components/Loader';

export function TaskAdd() {
  const [isAdding, setIsAdding] = useState(false);

  const [addTask, { isLoading: isCreating }] = useAddTaskMutation();

  const handleAddTask = (data: CreateTaskDto) => {
    addTask(data)
      .unwrap()
      .then(() => setIsAdding(false))
      .catch((err: any) => {
        console.error('Failed to create task:', err);
      });
  };

  return (
    <div className="mb-4">
      <button
        className={`btn ${isAdding ? 'btn-secondary' : 'btn-success'}`}
        onClick={() => setIsAdding(!isAdding)}
        disabled={isCreating}>
        {isAdding ? 'Close Form' : 'Add New Task'}
      </button>

      {isAdding && (
        <div className="card p-4 mt-3">
          <h2>Create New Task</h2>
          <TaskForm onSubmit={handleAddTask} onCancel={() => setIsAdding(false)} />
          {isCreating && (
            <Loader isLoading={true} variant="dot">
              <></>
            </Loader>
          )}
        </div>
      )}
    </div>
  );
}

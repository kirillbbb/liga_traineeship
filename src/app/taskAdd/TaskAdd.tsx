import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import { TaskFormValues } from './validation';
import { Loader } from 'components/Loader';

import { useCreateTaskMutation } from 'services/taskApi';

export function TaskAdd() {
  const [isAdding, setIsAdding] = useState(false);

  const [createTask, { isLoading: isCreating, isError: isCreateError }] = useCreateTaskMutation();

  const handleAddTask = (data: TaskFormValues) => {
    createTask(data)
      .unwrap()
      .then(() => {
        setIsAdding(false);
      })
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

          {isCreateError && <div className="text-danger mb-3">Не удалось сохранить задачу. Попробуйте снова.</div>}

          <TaskForm onSubmit={handleAddTask} onCancel={() => setIsAdding(false)} isSubmitting={isCreating} />
        </div>
      )}
    </div>
  );
}

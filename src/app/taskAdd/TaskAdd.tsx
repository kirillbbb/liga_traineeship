import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { createTask } from '../../api/tasksActions';
import { TaskFormValues } from '../../api/tasksApi';

import TaskForm from './components/TaskForm';

export function TaskAdd() {
  const dispatch = useAppDispatch();

  const [isAdding, setIsAdding] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const [isCreateError, setIsCreateError] = useState(false);

  const handleAddTask = useCallback(
    async (data: TaskFormValues) => {
      setIsCreating(true);
      setIsCreateError(false);

      try {
        const resultAction = await dispatch(createTask(data));

        if (createTask.fulfilled.match(resultAction)) {
          setIsAdding(false);
        } else {
          setIsCreateError(true);
          console.error('Failed to create task:', resultAction.payload || resultAction.error.message);
        }
      } catch (err) {
        setIsCreateError(true);
        console.error('An unexpected error occurred:', err);
      } finally {
        setIsCreating(false);
      }
    },
    [dispatch]
  );

  const handleCancel = useCallback(() => {
    setIsAdding(false);
    setIsCreateError(false);
  }, []);

  return (
    <div className="mb-4">
      <button
        className={`btn ${isAdding ? 'btn-secondary' : 'btn-success'}`}
        onClick={() => setIsAdding(!isAdding)}
        disabled={isCreating}>
        {isAdding ? 'Закрыть форму' : 'Добавить новую задачу'}
      </button>
      {isAdding && (
        <div className="card p-4 mt-3">
          <h2>Создать новую задачу</h2>

          {isCreateError && <div className="text-danger mb-3">Не удалось сохранить задачу. Попробуйте снова.</div>}

          <TaskForm onSubmit={handleAddTask} onCancel={handleCancel} isSubmitting={isCreating} />
        </div>
      )}
    </div>
  );
}

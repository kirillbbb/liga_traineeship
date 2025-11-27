import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import TaskItem from './components/TaskItem';
import { RootState, GetTasksParams } from 'api/tasksApi';

import { fetchTasks, deleteTask, updateTask } from 'api/tasksActions';

import { Loader } from 'components/Loader';
import { PageContainer } from 'components/PageContainer';

const TaskListComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tasks, isLoading, error } = useAppSelector((state: RootState) => state.tasks);

  const { isCompleted, isImportant, search } = useAppSelector((state: RootState) => state.filters);

  useEffect(() => {
    const filters: GetTasksParams = {
      isCompleted: isCompleted ?? undefined,
      isImportant: isImportant ?? undefined,
      name_like: search.trim() || undefined,
    };

    dispatch(fetchTasks(filters));
  }, [dispatch, isCompleted, isImportant, search]);

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      dispatch(deleteTask(taskId));
    },
    [dispatch]
  );

  const handleToggleComplete = useCallback(
    (taskId: string, isCompleted: boolean) => {
      dispatch(
        updateTask({
          id: taskId,
          body: {
            isCompleted: isCompleted,
          },
        })
      );
    },
    [dispatch]
  );

  const displayTasks = tasks || [];

  if (isLoading && !displayTasks.length) {
    return <Loader isLoading={true} />;
  }

  if (error) {
    return <PageContainer>Ошибка загрузки: {error}</PageContainer>;
  }

  return (
    <PageContainer>
      <div className="list-group gap-3">
        {displayTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
        ))}
      </div>
    </PageContainer>
  );
};

export default TaskListComponent;

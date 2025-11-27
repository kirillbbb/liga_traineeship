import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { TaskAdd } from '../taskAdd/TaskAdd';
import TaskItem from './components/TaskItem';
import { RootState, GetTasksParams } from 'api/tasksApi';

import { fetchTasks, deleteTask, updateTask } from 'api/tasksActions';

import { Loader } from 'components/Loader';
import { PageContainer } from 'components/PageContainer';

const TaskListComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tasks, isLoading, error } = useAppSelector((state: RootState) => state.tasks);
  const filtersState = useAppSelector((state: RootState) => state.filters);

  // Мемоизация фильтров для useEffect
  const filters: GetTasksParams = useMemo(
    () => ({
      isCompleted: filtersState.isCompleted ?? undefined,
      isImportant: filtersState.isImportant ?? undefined,
      name_like: filtersState.search.trim() || undefined,
    }),
    [filtersState.isCompleted, filtersState.isImportant, filtersState.search]
  );

  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

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
    <PageContainer title="Список Задач">
      <TaskAdd />
      <div className="list-group">
        {displayTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
        ))}
        {!isLoading && displayTasks.length === 0 && (
          <p className="text-center text-muted mt-4">Задачи по текущим фильтрам не найдены.</p>
        )}
      </div>
    </PageContainer>
  );
};

export default TaskListComponent;

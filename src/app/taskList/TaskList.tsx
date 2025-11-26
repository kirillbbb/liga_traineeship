// src/app/taskList/TaskList.tsx

import React, { useCallback } from 'react';

// ✅ ИСПРАВЛЕНИЕ 1: Импорт RootState (для типизации Redux)
import TaskItem from './components/TaskItem';
import { RootState } from 'app/integration/store';
import { useAppSelector } from 'app/integration/hooks';

import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from 'services/taskApi';
import { Task, GetTasksParams } from 'types/task';
import { Loader } from 'components/Loader';
import { PageContainer } from 'components/PageContainer';
import { TaskAdd } from 'app/taskAdd/TaskAdd';

const TaskListComponent: React.FC = () => {
  const filtersState = useAppSelector((state) => state.filters);

  const filters: GetTasksParams = {
    isCompleted: filtersState.isCompleted || undefined,
    isImportant: filtersState.isImportant || undefined,
    name_like: filtersState.search.trim() || undefined,
  };

  const { data: tasks, isLoading, isError, error } = useGetTasksQuery(filters);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      deleteTask(taskId);
    },
    [deleteTask]
  );

  const handleToggleComplete = useCallback(
    (taskId: string, isCompleted: boolean) => {
      updateTask({
        id: taskId,
        body: {
          isCompleted: isCompleted,
        },
      });
    },
    [updateTask]
  );

  const displayTasks: Task[] = tasks || [];

  return (
    <PageContainer>
      <Loader isLoading={isLoading}>
        {isError && (
          <div className="alert alert-danger" role="alert">
            Error loading tasks: {JSON.stringify(error)}
          </div>
        )}

        {displayTasks.length === 0 && !isLoading ? (
          <p className="mt-4">No tasks found.</p>
        ) : (
          <div className="list-group">
            {displayTasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
            ))}
          </div>
        )}
      </Loader>
    </PageContainer>
  );
};

const TaskList = React.memo(TaskListComponent);
export default TaskList;

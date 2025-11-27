import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../hooks/reduxHooks';
import { updateTask } from '../api/tasksActions';
import { Task, TaskFormValues } from '../api/tasksApi';

import TaskForm from '../app/taskAdd/components/TaskForm';
import { PageContainer } from 'components/PageContainer';
import { Loader } from 'components/Loader';

const BASE_URL = 'https://tasks-service-maks1394.amvera.io';

const TaskEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<Task | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      setIsFetching(true);
      setError(null);
      try {
        const response = await axios.get<Task>(`${BASE_URL}/tasks/${id}`);
        setTask(response.data);
      } catch (e) {
        setError('Ошибка загрузки задачи. Возможно, задача с этим ID не найдена.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = useCallback(
    async (data: TaskFormValues) => {
      if (!id) return;

      setIsUpdating(true);
      setError(null);

      const resultAction = await dispatch(updateTask({ id, body: data }));

      if (updateTask.fulfilled.match(resultAction)) {
        navigate(-1);
      } else {
        setError('Не удалось сохранить изменения. Попробуйте снова.');
        console.error('Failed to update task:', resultAction.payload || resultAction.error);
      }
      setIsUpdating(false);
    },
    [dispatch, id, navigate]
  );

  const handleCancel = () => {
    navigate(-1);
  };

  if (isFetching) {
    return (
      <PageContainer>
        <Loader isLoading={true} variant="dot">
          Загрузка данных задачи...
        </Loader>
      </PageContainer>
    );
  }

  if (error || !task) {
    return (
      <PageContainer>
        <div className="alert alert-danger">{error || `Задача с ID **${id}** не найдена.`}</div>
      </PageContainer>
    );
  }

  const formProps: TaskFormValues = {
    name: task.name ?? '',
    info: task.info ?? '',
    isCompleted: task.isCompleted ?? false,
    isImportant: task.isImportant ?? false,
  };

  return (
    <PageContainer>
      <div className="task-edit-page">
        <h1>Редактировать задачу: {task.name}</h1>

        {error && <div className="alert alert-warning mb-3">{error}</div>}

        <TaskForm initialData={formProps} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isUpdating} />
      </div>
    </PageContainer>
  );
};

export default TaskEditPage;

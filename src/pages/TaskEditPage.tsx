import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../hooks/reduxHooks';
import { updateTask } from '../api/tasksActions';
import { Task, TaskFormValues } from '../api/tasksApi';

import TaskForm from '../app/taskAdd/components/TaskForm';
import { Loader } from 'components/Loader';
// Убедитесь, что путь импорта соответствует регистру вашей папки ('modal' или 'Modal')
import { TaskModal } from 'components/modal';

// Предполагаем, что BASE_URL теперь экспортируется из API файлов
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
    let isMounted = true;

    const fetchTask = async () => {
      setIsFetching(true);
      setError(null);
      try {
        const url = `${BASE_URL}/tasks/${id}`;
        const response = await axios.get<Task>(url);
        if (isMounted) {
          setTask(response.data);
        }
      } catch (e) {
        if (isMounted) {
          setError('Ошибка загрузки задачи. Возможно, задача с этим ID не найдена.');
        }
      } finally {
        if (isMounted) setIsFetching(false);
      }
    };

    fetchTask();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = useCallback(
    async (data: TaskFormValues) => {
      if (!id) return;
      setIsUpdating(true);
      setError(null);

      const resultAction = await dispatch(updateTask({ id, body: data }));

      if (updateTask.fulfilled.match(resultAction)) {
        navigate(-1); // Закрывается модальное окно через навигацию
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

  if (!id) {
    navigate(-1);
    return null;
  }

  return (
    <TaskModal isOpen={true} onClose={handleCancel}>
      {isFetching ? (
        <Loader isLoading={true} variant="dot">
          Загрузка данных задачи...
        </Loader>
      ) : error || !task ? (
        <div>
          <div className="alert alert-danger mb-3">{error || `Задача с ID **${id}** не найдена.`}</div>
          <button className="btn btn-primary" onClick={handleCancel}>
            Закрыть
          </button>
        </div>
      ) : (
        <div className="task-edit-page">
          <h1 className="w-100 mb-4" style={{ wordWrap: 'break-word' }}>
            Редактировать задачу: {task.name}
          </h1>

          {error && <div className="alert alert-warning mb-3">{error}</div>}

          <TaskForm
            initialData={{ ...task, id: undefined } as TaskFormValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isUpdating}
          />
        </div>
      )}
    </TaskModal>
  );
};

export default TaskEditPage;

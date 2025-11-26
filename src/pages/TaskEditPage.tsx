import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { PageContainer } from 'components/PageContainer';
import { Loader } from 'components/Loader';

import TaskForm from 'app/taskAdd/components/TaskForm';
import { TaskFormValues } from 'app/taskAdd/validation';

import { useGetTaskQuery, useUpdateTaskMutation } from 'services/taskApi';
import { Task } from 'types/task';

const TaskEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: initialData,
    isLoading: isFetching,
    isError: isFetchError,
  } = useGetTaskQuery(id || '', {
    skip: !id,
  });

  const [updateTask, { isLoading: isUpdating, isError: isUpdateError }] = useUpdateTaskMutation();

  const handleSubmit = async (data: TaskFormValues) => {
    if (!id) return;
    try {
      await updateTask({
        id,
        body: {
          ...data,
        },
      }).unwrap();
      navigate(-1);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

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

  if (isFetchError || !initialData) {
    return (
      <PageContainer>
        <div className="alert alert-danger">Ошибка загрузки задачи или задача с ID **{id}** не найдена.</div>
      </PageContainer>
    );
  }
  const formProps: TaskFormValues = {
    title: initialData.title ?? '',
    description: initialData.description ?? '',
    isCompleted: initialData.isCompleted ?? false,
    isImportant: initialData.isImportant ?? false,
  };

  return (
    <PageContainer>
      <div className="task-edit-page">
        <h1>Редактировать задачу: {initialData.title}</h1>

        {isUpdateError && (
          <div className="alert alert-warning mb-3">Не удалось сохранить изменения. Попробуйте снова.</div>
        )}

        <TaskForm initialData={formProps} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isUpdating} />
      </div>
    </PageContainer>
  );
};

export default TaskEditPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from 'components/PageContainer';
import TaskForm from 'app/taskAdd/components/TaskForm';
import { useGetTasksQuery, useUpdateTaskMutation } from 'api/tasksApi';
import { UpdateTaskDto } from 'types/task';

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tasks = [] } = useGetTasksQuery();
  const task = tasks.find((t) => t.id === id);

  const [updateTask] = useUpdateTaskMutation();

  if (!task) return <p>Loading task...</p>;

  const onSubmit = async (data: UpdateTaskDto) => {
    await updateTask({ id: task.id, data });
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm onSubmit={onSubmit} defaultValues={task} />
    </div>
  );
};

export default TaskEdit;

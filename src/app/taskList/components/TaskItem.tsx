// src/app/taskList/components/TaskItem.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { Task } from 'types/task';

interface Props {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, isCompleted: boolean) => void;
}

const TaskItemComponent: React.FC<Props> = ({ task, onDelete, onToggleComplete }) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleComplete(task.id, e.target.checked);
  };

  return (
    <div className="todo-item">
      {/* 1. ✅ MUI Checkbox */}
      {/* Теперь MUI управляет иконками CheckBoxOutlineBlankIcon и CheckBoxIcon */}
      <Checkbox
        checked={task.isCompleted}
        onChange={handleToggle}
        color="primary" // Использует цвет 'dark', который мы настроили в theme.ts
        // Использование SX prop для стилизации и сохранения SCSS-логики зачеркивания:
        sx={{
          padding: 0,
          marginLeft: '6px', // Небольшой отступ, чтобы выглядело аккуратно
          // Это CSS-селектор для SCSS-логики: если чекбокс отмечен, зачеркнуть соседнюю метку
          '&.Mui-checked + .todo-item__label': {
            color: 'var(--color-gray-4)',
            textDecoration: 'line-through',
          },
        }}
      />

      {/* 2. Контент Задачи (Название) */}
      <div className="todo-item__label">
        <span className="todo-item__title">{task.title}</span>
        {task.isImportant && (
          <span className="ms-2 text-warning" style={{ color: '#FFC107' }}>
            <i className="fa fa-star" aria-hidden="true" />
          </span>
        )}
      </div>

      {/* 3. КОНТЕЙНЕР ДЕЙСТВИЙ */}
      <div className="todo-item__actions">
        {/* Иконка Редактирования */}
        <Link to={`/tasks/edit/${task.id}`} style={{ textDecoration: 'none', color: 'var(--color-gray-4)' }}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </Link>

        {/* Иконка Удаления */}
        <button onClick={() => onDelete(task.id)} className="todo-item__delete-button" type="button">
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
export default React.memo(TaskItemComponent);

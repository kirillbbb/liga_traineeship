// src/app/taskList/components/TaskItem.tsx

import React from 'react';
import { Link } from 'react-router-dom';
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
      <input
        type="checkbox"
        className="todo-item__checkbox"
        id={`task-${task.id}`}
        checked={task.isCompleted}
        onChange={handleToggle}
      />

      <div className="todo-item__label">
        <div style={{ fontWeight: 'bold' }}>
          {task.title}

          {task.isImportant && (
            <span className="ms-2 text-warning" style={{ color: '#FFC107' }}>
              <i className="fa fa-star" aria-hidden="true" />
            </span>
          )}
        </div>

        {task.description && (
          <div className="text-muted" style={{ fontSize: '0.8em', marginTop: '2px' }}>
            {task.description}
          </div>
        )}
      </div>

      <Link
        to={`/tasks/edit/${task.id}`}
        className="ms-auto"
        style={{ textDecoration: 'none', color: 'var(--color-gray-4)' }}>
        <i className="fa fa-pencil" aria-hidden="true" />
      </Link>

      <button onClick={() => onDelete(task.id)} className="todo-item__delete-button">
        <i className="fa fa-trash" aria-hidden="true" />
      </button>
    </div>
  );
};
export default React.memo(TaskItemComponent);

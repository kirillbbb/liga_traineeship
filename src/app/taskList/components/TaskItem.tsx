import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from 'types/task';

interface Props {
  task: Task;
  onDelete: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
      <strong>{task.title}</strong>
      {task.isImportant && <span> ⭐</span>}
      <p>{task.description}</p>

      <p>Status: {task.isCompleted ? 'Completed' : 'Not completed'}</p>

      <Link to={`/edit/${task.id}`}>Edit</Link>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;

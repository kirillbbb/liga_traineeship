import React, { useMemo, useState } from 'react';

import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import { useGetTasksQuery, useDeleteTaskMutation } from 'api/tasksApi';
import { Task } from 'types/task';

import { Loader } from 'components/Loader';
import { PageContainer } from 'components/PageContainer';

import { TaskAdd } from 'app/taskAdd/TaskAdd';

const TaskListComponent: React.FC = () => {
  const [search, setSearch] = useState('');
  const [completedOnly, setCompletedOnly] = useState(false);
  const [importantOnly, setImportantOnly] = useState(false);

  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const filteredTasks = useMemo(() => {
    const taskArray: Task[] = tasks || [];

    return taskArray
      .filter((t) => (t.title || '').toLowerCase().includes(search.toLowerCase().trim()))
      .filter((t) => (completedOnly ? t.isCompleted : true))
      .filter((t) => (importantOnly ? t.isImportant : true));
  }, [tasks, search, completedOnly, importantOnly]);

  return (
    <PageContainer>
      <h1>Task List</h1>

      <TaskAdd />

      <Loader isLoading={isLoading}>
        {isError && (
          <div className="alert alert-danger" role="alert">
            Error loading tasks: {JSON.stringify(error)}
          </div>
        )}

        <TaskFilters
          search={search}
          setSearch={setSearch}
          completedOnly={completedOnly}
          setCompletedOnly={setCompletedOnly}
          importantOnly={importantOnly}
          setImportantOnly={setImportantOnly}
        />

        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="list-group">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
            ))}
          </div>
        )}
      </Loader>
    </PageContainer>
  );
};

const TaskList = React.memo(TaskListComponent);
export default TaskList;

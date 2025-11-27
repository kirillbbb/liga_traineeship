import React, { useCallback, useState, useEffect } from 'react';

import { TaskAdd } from 'app/taskAdd/TaskAdd';
import { useAppDispatch, useAppSelector } from 'app/integration/hooks';
import { setSearch, toggleCompleted, toggleImportant } from 'api/tasksApi';

const TaskFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { search: reduxSearch, isCompleted, isImportant } = useAppSelector((state) => state.filters);
  const [localSearch, setLocalSearch] = useState(reduxSearch);

  // --- ЛОГИКА DEBOUNCE, handleLocalSearchChange, handleCompletedToggle, handleImportantToggle без изменений ---
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== reduxSearch) {
        dispatch(setSearch(localSearch));
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, dispatch, reduxSearch]);

  const handleLocalSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  }, []);

  const handleCompletedToggle = useCallback(() => {
    dispatch(toggleCompleted());
  }, [dispatch]);

  const handleImportantToggle = useCallback(() => {
    dispatch(toggleImportant());
  }, [dispatch]);

  return (
    <div className="task-filters mb-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks..."
          value={localSearch}
          onChange={handleLocalSearchChange}
        />
      </div>

      <div className="text-center mb-3">
        {/* TaskAdd (кнопка + форма) */}
        <TaskAdd />
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3">
        {/* Фильтр "Важное" */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="importantOnly"
            checked={isImportant === true}
            onChange={handleImportantToggle}
          />
          <label className="form-check-label" htmlFor="importantOnly">
            Important Only
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="completedOnly"
            checked={isCompleted === true}
            onChange={handleCompletedToggle}
          />
          <label className="form-check-label" htmlFor="completedOnly">
            Completed Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;

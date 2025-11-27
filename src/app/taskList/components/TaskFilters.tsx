import React from 'react';

import { useAppDispatch, useAppSelector } from 'app/integration/hooks';
import { setSearch, toggleCompleted, toggleImportant } from 'app/integration/filterSlice';

const TaskFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { search, isCompleted, isImportant } = useAppSelector((state) => state.filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCompletedToggle = () => {
    dispatch(toggleCompleted());
  };

  const handleImportantToggle = () => {
    dispatch(toggleImportant());
  };

  return (
    <div className="task-filters d-flex justify-content-start gap-3 p-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearchChange}
        style={{ width: '250px' }}
      />

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="completedOnly"
          checked={isCompleted ?? false}
          onChange={handleCompletedToggle}
        />
        <label className="form-check-label" htmlFor="completedOnly">
          Completed Only
        </label>
      </div>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id="importantOnly"
          checked={isImportant ?? false}
          onChange={handleImportantToggle}
        />
        <label className="form-check-label" htmlFor="importantOnly">
          Important Only
        </label>
      </div>
    </div>
  );
};

export default React.memo(TaskFilters);

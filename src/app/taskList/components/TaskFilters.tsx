import React, { ChangeEvent } from 'react';
import { Checkbox } from 'components/Checkbox';
import { SearchInput } from 'components/SearchInput';

interface Props {
  search: string;
  setSearch: (v: string) => void;
  completedOnly: boolean;
  setCompletedOnly: (v: boolean) => void;
  importantOnly: boolean;
  setImportantOnly: (v: boolean) => void;
}

const TaskFiltersComponent: React.FC<Props> = ({
  search,
  setSearch,
  completedOnly,
  setCompletedOnly,
  importantOnly,
  setImportantOnly,
}) => {
  const handleCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompletedOnly(e.target.checked);
  };

  const handleImportantChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImportantOnly(e.target.checked);
  };

  const handleResetSearch = () => {
    setSearch('');
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <SearchInput value={search} onChange={setSearch} onReset={handleResetSearch} />

      <Checkbox
        label="Completed only"
        checked={completedOnly}
        onChange={handleCompletedChange}
        containerClassName="d-inline-block me-3"
      />

      <Checkbox
        label="Important only"
        checked={importantOnly}
        onChange={handleImportantChange}
        containerClassName="d-inline-block"
      />
    </div>
  );
};

const TaskFilters = React.memo(TaskFiltersComponent);
export default TaskFilters;

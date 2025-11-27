import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  isCompleted: boolean;
  isImportant: boolean;
}

const initialState: FilterState = {
  search: '',
  isCompleted: false,
  isImportant: false,
};
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleCompleted: (state) => {
      state.isCompleted = !state.isCompleted;
    },
    toggleImportant: (state) => {
      state.isImportant = !state.isImportant;
    },
    resetFilters: (state) => initialState,
  },
});

export const { setSearch, toggleCompleted, toggleImportant, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;

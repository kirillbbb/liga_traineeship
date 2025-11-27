import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  isCompleted: boolean | null;
  isImportant: boolean | null;
}

const initialState: FilterState = {
  search: '',
  isCompleted: null,
  isImportant: null,
};
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleCompleted: (state) => {
      if (state.isCompleted === null) {
        state.isCompleted = true;
      } else if (state.isCompleted === true) {
        state.isCompleted = false;
      } else {
        state.isCompleted = null;
      }
    },
    toggleImportant: (state) => {
      if (state.isImportant === null) {
        state.isImportant = true;
      } else if (state.isImportant === true) {
        state.isImportant = false;
      } else {
        state.isImportant = null;
      }
    },
    resetFilters: (state) => initialState,
  },
});

export const { setSearch, toggleCompleted, toggleImportant, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;

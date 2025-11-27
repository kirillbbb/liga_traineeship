import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  // ✅ ИСПРАВЛЕНИЕ: Используем 'boolean | null' для поддержки 3 состояний
  isCompleted: boolean | null;
  isImportant: boolean | null;
}

const initialState: FilterState = {
  search: '',
  // ✅ ИСПРАВЛЕНИЕ: Начальное состояние 'null' означает "показывать все"
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
    // ✅ ИСПРАВЛЕНИЕ: Переключение между null (Все), true (Только True) и false (Только False)
    toggleCompleted: (state) => {
      if (state.isCompleted === null) {
        state.isCompleted = true; // null (Все) -> true (Только выполненные)
      } else if (state.isCompleted === true) {
        state.isCompleted = false; // true -> false (Только невыполненные)
      } else {
        state.isCompleted = null; // false -> null (Все)
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

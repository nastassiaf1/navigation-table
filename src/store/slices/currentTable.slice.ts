import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Table } from 'interfaces/table';

const initialState: { currentTable: Table | null } = {
  currentTable: null,
};

const currentTableSlice = createSlice({
  name: 'currentTable',
  initialState,
  reducers: {
    setCurrentTable: (state, action: PayloadAction<Table | null>) => {
      state.currentTable = action.payload;
    },
    clearCurrentTable: (state) => {
      state.currentTable = null;
    },
  },
});

export const { setCurrentTable, clearCurrentTable } = currentTableSlice.actions;

export default currentTableSlice.reducer;

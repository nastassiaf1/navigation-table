import { RootState } from "store/store";

export const selectCurrentTable = (state: RootState) => state.currentTable.currentTable;

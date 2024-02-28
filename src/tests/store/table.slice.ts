import mockTables from 'mocks/table';
import store from 'store/store';
import { setCurrentTable, clearCurrentTable } from 'store/slices/currentTable.slice';

describe('currentTableSlice', () => {
    it('should set the current table', () => {
        const table = mockTables[0];
        store.dispatch(setCurrentTable(table));

        const state = store.getState().currentTable;
        expect(state.currentTable).toEqual(table);
    });

    it('should clear the current table', () => {
        store.dispatch(clearCurrentTable());

        const state = store.getState().currentTable;
        expect(state.currentTable).toBeNull();
    });
});

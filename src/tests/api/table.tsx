import { renderHook, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import mockTables from 'mocks/table';
import {
    useGetTablesDataByUserQuery,
    useAddTableMutation,
    useRemoveTableMutation,
    useUpdateTableMutation,
} from 'api/table.service';
import store from 'store/store';
import { Table } from 'interfaces/table';
import mockUsers from 'mocks/user';

fetchMock.enableMocks();

const wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
};

beforeAll((): void => {
    fetchMock.resetMocks();
});

describe('tableApi', () => {
    const newTable: Table = {
        id: 'test',
        name: 'Test Table',
        userId: mockUsers[1].id,
        columns: [
            {
                id: 'testId_1',
                name: 'First column',
            },
            {
                id: 'testId_2',
                name: 'Second column',
            },
        ],
        rows: [],
    };

    it('get tables by useGetTablesDataByUserQuery', async () => {
        fetchMock.mockResponse(JSON.stringify(mockTables));
        const { result } = renderHook(() => useGetTablesDataByUserQuery(mockTables[0].userId), {
            wrapper
        });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        await waitFor(() => expect(result.current.data).toBeDefined());
    });

    it('add new table by useAddTableMutation', async () => {
        fetchMock.mockResponse(JSON.stringify(newTable));

        const { result } = renderHook(
            () => useAddTableMutation(undefined),
            { wrapper }
        );
        const [addNewData, initialResponse] = result.current;

        expect(initialResponse.data).toBeUndefined();

        act(() => {
            void addNewData(newTable);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current[1].data).toBeDefined();
            // can't call dispatch ??
            /*const savedData = store.getState().api.queries['getTablesDataByUser("2")']?.data || [];
            console.log('savedData : ', store.getState().api.queries)
            expect((savedData as any[]).find(item => item.id === newTable.id)).toBeDefined();*/
        });
    });

    it('update table by useUpdateTableMutation', async () => {
        const updatedTable = { ...mockTables[0], name: 'Updated Test Table' };

        fetchMock.mockResponse(JSON.stringify(updatedTable));

        const { result } = renderHook(
            () => useUpdateTableMutation(undefined),
            { wrapper }
        );
        const [updateData, initialResponse] = result.current;

        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            void updateData(updatedTable);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitFor(() => expect(result.current[1].isLoading).toBe(false));
        await waitFor(() => expect(result.current[1].data).toBeDefined());
        await waitFor(() => expect(result.current[1].isSuccess).toBe(true));
    });

    it('remove table by useRemoveTableMutation', async () => {
        fetchMock.mockResponse(JSON.stringify(newTable));

        const { result } = renderHook(
            () => useRemoveTableMutation(undefined),
            { wrapper }
        );
        const [removeNewData, initialResponse] = result.current;

        expect(initialResponse.data).toBeUndefined();

        act(() => {
            void removeNewData(newTable.id!);
        });

        await waitFor(() => expect(result.current[1].data).toBeDefined());
        // ??
        const savedData = store.getState().api.queries['getTablesDataByUser("2")']?.data || [];
        expect((savedData as any[]).find(item => item.id === newTable.id)).toBeUndefined();
    });
});

import { renderHook, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import mockData from 'mocks/data';
import {
    useGetTableDataQuery,
    useUpdateDataMutation,
    useAddDataMutation,
    useRemoveDataMutation,
} from 'api/table.service.';
import store from 'store/store';
import { TableData } from 'interfaces/table';

fetchMock.enableMocks();

const wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
};

beforeAll((): void => {
    fetchMock.resetMocks();
});

describe('tableApi', () => {
    const newData: TableData = { id: 'test', name: 'Test', age: 33, isVerified: true };

    it('renders useGetTableDataQuery', async () => {
        fetchMock.mockResponse(JSON.stringify(mockData));
        const { result } = renderHook(() => useGetTableDataQuery(), {
            wrapper
        });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        await waitFor(() => expect(result.current.data).toBeDefined());
    });

    it('renders useUpdateDataMutation', async () => {
        const updatedUser = { ...mockData[0], name: 'Test' };

        fetchMock.mockResponse(JSON.stringify(updatedUser));

        const { result } = renderHook(
            () => useUpdateDataMutation(undefined),
            { wrapper }
        );
        const [updateData, initialResponse] = result.current;

        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            void updateData(updatedUser);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitFor(() => expect(result.current[1].isLoading).toBe(false));
        await waitFor(() => expect(result.current[1].data).toBeDefined());
        await waitFor(() => expect(result.current[1].isSuccess).toBe(true));
    });

    it('add new data by useAddDataMutation', async () => {
        fetchMock.mockResponse(JSON.stringify(newData));

        const { result } = renderHook(
            () => useAddDataMutation(undefined),
            { wrapper }
        );
        const [addNewData, initialResponse] = result.current;

        expect(initialResponse.data).toBeUndefined();

        act(() => {
            void addNewData(newData);
        });

        await waitFor(() => expect(result.current[1].data).toBeDefined());

        const savedData = store.getState().api.queries['getTableData(undefined)']?.data || [];
        expect((savedData as any[]).find(item => item.id === newData.id)).toBeDefined();
    });

    it('remove new data by useAddDataMutation', async () => {
        fetchMock.mockResponse(JSON.stringify(newData));

        const { result } = renderHook(
            () => useRemoveDataMutation(undefined),
            { wrapper }
        );
        const [removeNewData, initialResponse] = result.current;

        expect(initialResponse.data).toBeUndefined();

        act(() => {
            void removeNewData(newData.id!);
        });

        await waitFor(() => expect(result.current[1].data).toBeDefined());

        const savedData = store.getState().api.queries['getTableData(undefined)']?.data || [];
        expect((savedData as any[]).find(item => item.id === newData.id)).toBeUndefined();
    });
});

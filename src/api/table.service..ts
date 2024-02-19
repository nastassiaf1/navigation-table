import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector } from '@reduxjs/toolkit';
import { Table } from '../interfaces/table';
import { environment } from '../env/env';

export const tableApi = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: environment.apiUrl,
    }),
    tagTypes: ['TableData'],
    endpoints: (builder) => ({
        getTablesDataByUser: builder.query<Table[], string>({
            query: (userId: string) => `table?userId=${userId}`,
        }),
        addTable: builder.mutation<Table, Table>({
            query: ({ id, userId, name, columns}) => ({
                url: `table`,
                method: 'POST',
                body: { id, userId, name, columns },
            }),
            async onQueryStarted(_data, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        tableApi.util.updateQueryData('getTablesDataByUser', data.userId, (draft) => {
                            draft.push(data)
                        })
                    )
                } catch(error) {
                    throw new Error((error as Error).message);
                }
            },
        }),
        getTableData: builder.query<Table[], void>({
            query: () => 'data',
        }),
        updateTable: builder.mutation<Table, Table>({
            query: (table) => ({
                url: `table/${table.id}`,
                method: 'PUT',
                body: table,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const res = dispatch(
                    tableApi.util.updateQueryData('getTablesDataByUser', data.userId, (draft) => {
                        const index = draft.findIndex(n => n.id === data.id);

                        if (index !== -1) {
                            draft[index] = data;
                        }
                    })
                )

                try {
                  await queryFulfilled
                } catch {
                    res.undo()
                }
            },
        }),
        removeTableRow: builder.mutation<Table, string>({
            query: (id) => ({
                url: `data/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(_id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        tableApi.util.updateQueryData('getTableData', undefined, (draft) => {
                            const index = draft.findIndex(n => n.id === data.id);

                            if (index !== -1) {
                                draft.splice(index, 1);
                            }
                        })
                    )
                } catch(error) {
                    throw new Error((error as Error).message);
                }
            },
        }),
    }),
});

export const selectUserById = createSelector(
    [state => state, (_, params) => params],
    (state, userId) => {
        const users = tableApi.endpoints.getTableData.select()(state)?.data;
        return users ? users.find(({ id }) => id === userId ) : null;
    }
)

export const {
    useGetTablesDataByUserQuery,
    useAddTableMutation,
    useGetTableDataQuery,
    useUpdateTableMutation,
    useRemoveTableRowMutation
} = tableApi;

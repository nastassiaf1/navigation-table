import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TableData } from '../interfaces/tableData';
import { environment } from '../env/env';
import { createSelector } from '@reduxjs/toolkit';

export const tableApi = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: environment.apiUrl,
    }),
    tagTypes: ['TableData'],
    endpoints: (builder) => ({
        getTableData: builder.query<TableData[], void>({
            query: () => 'data',
            providesTags: result => result ? [{ type: 'TableData', id: 'LIST' }] : [],
        }),
        updateData: builder.mutation<TableData, TableData>({
            query: ({ id, name, age, isVerified }) => ({
                url: `data/${id}`,
                method: 'PUT',
                body: { name, age, isVerified },
            }),
            async onQueryStarted(_data, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        tableApi.util.updateQueryData('getTableData', undefined, (draft) => {
                            const index = draft.findIndex(n => n.id === data.id);

                            if (index !== -1) {
                                draft[index] = data;
                            }
                        })
                    )
                } catch(error) {
                    throw new Error(error.message);
                }
            },
        }),
        addData: builder.mutation<TableData, TableData>({
            query: ({ id, name, age, isVerified }) => ({
                url: `data`,
                method: 'POST',
                body: { id, name, age, isVerified },
            }),
            async onQueryStarted(_data, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        tableApi.util.updateQueryData('getTableData', undefined, (draft) => {
                            draft.push(data)
                        })
                    )
                } catch(error) {
                    throw new Error(error.message);
                }
            },
        }),
        removeData: builder.mutation<TableData, string>({
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
                    throw new Error(error.message);
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
    useGetTableDataQuery,
    useGetRowQuery,
    useUpdateDataMutation,
    useAddDataMutation,
    useRemoveDataMutation
} = tableApi;

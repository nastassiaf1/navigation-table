import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TableData } from '../interfaces/tableData';
import { environment } from '../env/env';

export const tableApi = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: environment.apiUrl,
    }),
    tagTypes: ['TableData'],
    endpoints: (builder) => ({
        getTableData: builder.query<TableData[], void>({
            query: () => 'data',
        }),
        getRow: builder.query<TableData, { id: number }>({
            query: ({ id }) => ({
                url: `data/${id}`,
                method: 'GET',
            }),
        }),
        updateData: builder.mutation<TableData, TableData>({
            query: ({ id, name, age, isVerified }) => ({
                url: `data/${id}`,
                method: 'PUT',
                body: { name, age, isVerified },
            }),
        }),
    }),
});

export const { useGetTableDataQuery, useGetRowQuery, useUpdateDataMutation } = tableApi;

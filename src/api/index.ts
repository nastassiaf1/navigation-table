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
        /*updateData: builder.mutation<TableData, { id: number, data: Partial<TableData> }>({
        query: ({ id, data }) => ({
            url: `data/${id}`,
            method: 'PUT',
            body: data,
        }),
        }),*/
    }),
});

export const { useGetTableDataQuery } = tableApi;

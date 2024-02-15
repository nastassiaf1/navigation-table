import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'interfaces/user';
import { environment } from 'env/env';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: environment.apiUrl }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
        }),
        registerUser: builder.mutation<User, User>({
            query: (userInfo) => ({
                url: 'users',
                method: 'POST',
                body: userInfo,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useRegisterUserMutation } = userApi;

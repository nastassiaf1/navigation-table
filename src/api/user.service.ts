import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'interfaces/user';
import { environment } from 'env/env';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: environment.apiUrl }),
    endpoints: (builder) => ({
        // login imitation
        getUserByNameAndPassword: builder.query<User, Pick<User, 'name' | 'password'>>({
            query: (params) => `users?name=${params.name}&password=${params.password}`,
            transformResponse: (response: User[]) => response[0],
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

export const { useGetUserByNameAndPasswordQuery, useRegisterUserMutation } = userApi;

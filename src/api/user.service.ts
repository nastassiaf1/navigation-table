import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'interfaces/user';
import { environment } from 'env/env';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.apiUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, Pick<User, 'name' | 'password'>>({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<User, User>({
      query: (userInfo) => ({
        url: 'user/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;

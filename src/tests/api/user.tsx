import { renderHook, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useGetUserByNameAndPasswordQuery, useRegisterUserMutation } from 'api/user.service';
import store from 'store/store';
import mockUsers from 'mocks/user';
import { User } from 'interfaces/user';
import { UserRole } from 'constants/user.enum';

fetchMock.enableMocks();

const wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
};

beforeAll((): void => {
    fetchMock.resetMocks();
});

describe('userApi', () => {
    it('fetches user by name and password', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

        const { result } = renderHook(() => useGetUserByNameAndPasswordQuery({ name: mockUsers[0].name, password: mockUsers[0].password }), {
            wrapper,
        });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data).toBeDefined();
        });

        expect(result.current.data).toEqual(mockUsers[0]);
        // ??
        //expect(fetchMock).toHaveBeenCalledWith(`${environment.apiUrl}/users?name=${mockUsers[0].name}&password=${mockUsers[0].password}`, expect.any(Object));
    });

    it('registers a new user', async () => {
        const newUser: User = { id: '2', name: 'NewUser', password: 'newpassword123', role: UserRole.ADMIN };
        fetchMock.mockResponseOnce(JSON.stringify(newUser), { status: 200 });

        const { result } = renderHook(() => useRegisterUserMutation(), {
            wrapper,
        });

        act(() => {
            result.current[0](newUser).unwrap();
        });

        expect(result.current[1].isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current[1].data).toEqual(newUser);
            //expect(fetchMock).toHaveBeenCalledWith(`${environment.apiUrl}/users`, expect.any(Object));
        });
      });
});

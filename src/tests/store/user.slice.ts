import store from 'store/store';
import { setUser, logoutUser } from 'store/slices/user.slice';
import mockUsers from 'mocks/user';

describe('userSlice', () => {
    it('should set the current user', () => {
        const user = mockUsers[0];
        store.dispatch(setUser(user));

        const state = store.getState().user;
        expect(state!.currentUser).toEqual(user);
    });

    it('should clear the current user on logout', () => {
        store.dispatch(logoutUser());

        const state = store.getState().user;
        expect(state!.currentUser).toBeNull();
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import UserPage from 'pages/userPage';
import { logoutUser } from 'store/slices/user.slice';
import store from 'store/store';

const user = { name: 'Test User' };
const mockDispatch = jest.fn().mockImplementation(() => jest.fn());
const mockSelector = jest.fn().mockImplementation(() => {
    return user;
});
const mockNavigate = jest.fn().mockImplementation(() => jest.fn());

jest.mock('react-redux', () => {
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector(),
    }
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('UserPage', () => {
    const user = { name: 'Test User' };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the user name and log out button', async () => {
        const { getByText } = render(<Provider store={store}><BrowserRouter><UserPage /></BrowserRouter></Provider>);

        expect(getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();
    });

    it('dispatches logoutUser action and navigates to "/" on logout button click', () => {
        const { getByText } = render(<Provider store={store}><BrowserRouter><UserPage /></BrowserRouter></Provider>);
        const logoutButton = getByText('Log out');
        fireEvent.click(logoutButton);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});

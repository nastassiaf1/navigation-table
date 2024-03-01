import { fireEvent, render, screen } from "@testing-library/react";
import Navigation from "components/navigation";
import { MemoryRouter } from "react-router-dom";
import mockUsers from "mocks/user";
import '@testing-library/jest-dom';

const pathname = '/mock-path';
const mockSelector = jest.fn().mockImplementation(() => jest.fn());
const mockLocation = jest.fn().mockImplementation(() => ({
    pathname,
}));
const mockNavigate = jest.fn().mockImplementation(() => jest.fn());
const mockMatch = jest.fn().mockImplementation(() => jest.fn());

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation(),
    useMatch: () => mockMatch,
}));

jest.mock('react-redux', () => ({
    useSelector: () => mockSelector(),
}));

describe('Navigation Component', () => {
    beforeEach(() => {
        mockSelector.mockReturnValue(null);
        mockMatch.mockImplementation((path) => path === '/login');
    });

    it('renders login and registration buttons for unauthenticated users', () => {
        render(<MemoryRouter><Navigation /></MemoryRouter>);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Registration')).toBeInTheDocument();
        expect(screen.getByText('About us')).toBeInTheDocument();
    });

    it('navigates to login modal on login button click', () => {
        render(<MemoryRouter><Navigation /></MemoryRouter>);

        fireEvent.click(screen.getByText('Login'));
        expect(mockNavigate).toHaveBeenCalledWith('/login', { state: { backgroundLocation: { pathname } } });
    });

    it('renders user link and tables link for authenticated users', () => {
        mockSelector.mockReturnValue(mockUsers[0])
        render(<MemoryRouter><Navigation /></MemoryRouter>);

        expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument();
        expect(screen.getByText('Tables')).toBeInTheDocument();
        expect(screen.getByText('About us')).toBeInTheDocument();
    });
});

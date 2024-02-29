import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

import ErrorPage from 'pages/errorPage';

const error = new Error('Not found');
const mockError = jest.fn().mockImplementation(() => error)

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteError: () => mockError(),
}))

describe('ErrorPage', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders error message and link to Home', async () => {
        render(
             <MemoryRouter initialEntries={['/error']}>
                <Routes>
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(error.message)).toBeInTheDocument();

        const homeLink = screen.getByText('Go to home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
});

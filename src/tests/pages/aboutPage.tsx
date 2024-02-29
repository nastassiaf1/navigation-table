import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

import AboutPage from 'pages/aboutPage';

describe('AboutPage', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the link to preview', async () => {
        render(
            <MemoryRouter initialEntries={['/about']}>
                <Routes>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/about/preview" element={<div>Preview Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        const previewLink = screen.getByText('Preview');
        expect(previewLink).toBeInTheDocument();
        expect(previewLink.closest('a')).toHaveAttribute('href', '/about/preview');
    });
});

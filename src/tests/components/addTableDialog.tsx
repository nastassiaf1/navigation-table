import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTableDialog from 'components/table/addTableDialog';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('api/table.service', () => ({
    useAddTableMutation: jest.fn(() => [jest.fn()]),
}));
jest.mock('utils/uuid', () => () => 'uuid-mock');

const mockAddTableMutation = jest.fn().mockImplementation(() => [jest.fn()]);
jest.mock('api/table.service', () => ({
    useAddTableMutation: () => mockAddTableMutation(),
}));

describe('AddTableDialog', () => {
    it('renders correctly', () => {
        render(<AddTableDialog onClose={() => {}} userId="user-id-mock" />);

        expect(screen.getByPlaceholderText('Table Name')).toBeInTheDocument();
        expect(screen.getByText('Add column')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeDisabled();
    });

    it('allows adding a new column', () => {
        render(<AddTableDialog onClose={() => {}} userId="user-id-mock" />);

        let inputs = screen.getAllByRole('textbox'); // Includes Input Table Name and Input Column Name

        expect(inputs).toHaveLength(2);

        fireEvent.click(screen.getByText('Add column'));

        inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(3);
    });

    it('submits the form with table data', async () => {
        const { getByPlaceholderText } = render(<AddTableDialog onClose={() => {}} userId="user-id-mock" />);

        fireEvent.change(getByPlaceholderText('Table Name'), { target: { value: 'New Table' } });
        fireEvent.click(screen.getByText('Save'));

        waitFor(() => {
            expect(mockAddTableMutation).toHaveBeenCalledWith({
                id: 'uuid-mock',
                name: 'New Table',
                userId: 'user-id-mock',
                columns: expect.anything(),
            });
        });
    });

    it('removes a new column', () => {
        render(<AddTableDialog onClose={() => {}} userId="user-id-mock" />);

        let inputs = screen.getAllByRole('textbox');

        expect(inputs).toHaveLength(2);

        fireEvent.click(screen.getByLabelText('Delete Column'));

        inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(1);
    });
});

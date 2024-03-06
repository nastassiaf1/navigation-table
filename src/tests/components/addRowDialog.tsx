import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddRowDialog from "components/table/addRowDialog";
import mockTables from "tests/mocks/table";
import '@testing-library/jest-dom';

const mockSelector = jest.fn().mockImplementation(() => mockTables[0]);
const mockUpdateTableMutation = jest.fn().mockImplementation(() => [jest.fn(), { isLoading: false }]);
const mockForm = jest.fn().mockImplementation(() => ({ control: { register: jest.fn(), }, handleSubmit: () => jest.fn(), reset: () => jest.fn() }));

jest.mock('react-redux', () => ({
    useSelector: () => mockSelector(),
}));

jest.mock('api/table.service', () => ({
    useUpdateTableMutation: () => mockUpdateTableMutation(),
}));

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: () => mockForm(),
    Controller: ({ render }: { render: any}) => render({
        field: {
            onChange: jest.fn(),
            onBlur: jest.fn(),
            value: '',
            name: '',
            ref: jest.fn(),
        },
        fieldState: {}
    }),
}))

const uuid = 'uuid-mock';
jest.mock('utils/uuid', () => () => uuid);
jest.mock('components/spinner', () => () => <div>Spinner</div>);

describe('Add Row Dialog Component', () => {
    it('renders correctly', () => {
        render(<AddRowDialog onClose={() => {}} />);

        expect(screen.getByPlaceholderText(mockTables[0].columns[0].name)).toBeInTheDocument()
        expect(screen.getByLabelText('Close Add Row Modal')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('displays a spinner when loading', () => {
        mockUpdateTableMutation.mockReturnValue([() => {}, { isLoading: true }]);

        render(<AddRowDialog onClose={() => {}} />);

        expect(screen.getByText('Spinner')).toBeInTheDocument();
    });

    it('displays a message when no table is selected', () => {
        mockSelector.mockReturnValue(null);
        mockUpdateTableMutation.mockReturnValue([() => {}, { isLoading: false }]);

        render(<AddRowDialog onClose={() => {}} />);

        expect(screen.getByText('Please select a table first.')).toBeInTheDocument();
    });

    it('renders form fields correctly and submits data', async () => {
        const mockOnClose = jest.fn();
        const mockUpdateTable = jest.fn().mockResolvedValue({});

        mockSelector.mockReturnValue(mockTables[0]);
        mockUpdateTableMutation.mockReturnValue([mockUpdateTable, { isLoading: false }]);

        render(<AddRowDialog onClose={mockOnClose} />);

        fireEvent.change(screen.getByPlaceholderText(mockTables[0].columns[0].name), { target: { value: 'New Value' } });
        fireEvent.click(screen.getByText('Save'));

        waitFor(() => {
            expect(mockUpdateTable).toHaveBeenCalledWith({
                id: 'table1',
                name: mockTables[0].name,
                rows: expect.arrayContaining([
                    expect.objectContaining({
                        id: uuid,
                        [mockTables[0].columns[0].name]: 'New Value'
                    })
                ]),
                columns: expect.anything()
            });

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        })
    });
})

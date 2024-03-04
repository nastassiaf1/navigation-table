import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Table from 'components/table';
import '@testing-library/jest-dom';
import { mockTableData } from 'tests/mocks/table';

const mockSelector = jest.fn().mockImplementation(() => jest.fn());
const mockNavigate = jest.fn().mockImplementation(() => jest.fn());
const mockRemoveTableMutation = jest.fn().mockImplementation(() => [jest.fn()]);
const mockUpdateTableMutation = jest.fn().mockImplementation(() => [jest.fn()]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
jest.mock('api/table.service', () => ({
    useRemoveTableMutation: () => mockRemoveTableMutation(),
    useUpdateTableMutation: () => mockUpdateTableMutation(),
}));
jest.mock('redux', () => ({
    useSelector: () => mockSelector,
}));
jest.mock('utils/uuid', () => 'uuid-mock');
jest.mock('components/table/addRowDialog', () => () => <div>AddRowDialog Mock</div>);
jest.mock('components/table/editRowDialog', () => () => <div>EditRowDialog Mock</div>);
jest.mock('components/modalDialogPortal', () => ({ children }: { children: any }) => <div>ModalDialogPortal Mock - {children}</div>);
jest.mock('components/confirmationDialog', () => (props: any) => <div><span>ConfirmationDialog Mock</span> - {JSON.stringify(props)}</div>);

describe('Table component', () => {
    beforeAll(() => {
        global.structuredClone = jest.fn(obj => JSON.parse(JSON.stringify(obj)));
    });

    const mockData = mockTableData;

    it('renders table data correctly', () => {
        render(
            <BrowserRouter>
                <Table data={mockData} />
            </BrowserRouter>
        );

        expect(screen.getByText('Column 1')).toBeInTheDocument();
        expect(screen.getByText('Row 1 Value')).toBeInTheDocument();
    });

    it('opens AddRowDialog on add new row button click', () => {
        render(
            <BrowserRouter>
                <Table data={mockData} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Add New Row'));
        expect(screen.getByText('AddRowDialog Mock')).toBeInTheDocument();
    });

    it('shows the confirmation dialog correctly', () => {
        render(
            <BrowserRouter>
                <Table data={mockData} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByLabelText(`Remove Table ${mockData.name}`));
        expect(screen.getByText('ConfirmationDialog Mock')).toBeInTheDocument();
    });

    it('calls updateTable mutation with correct arguments on table update', () => {
        render(
          <BrowserRouter>
            <Table data={mockData} />
          </BrowserRouter>
        )

        fireEvent.click(screen.getByLabelText(`Edit Table ${mockData.name}`));
        fireEvent.change(screen.getByDisplayValue('Column 1'), { target: { value: 'Updated Column 1' } });
        fireEvent.click(screen.getByLabelText('Save changes'));

        waitFor(() => {
            expect(mockUpdateTableMutation).toHaveBeenCalledWith({
                ...mockData,
                columns: [{ id: 'column1', name: 'Updated Column 1' }],
            });
        });
    });
});


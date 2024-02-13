import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPage from 'pages/addPage';
import { BrowserRouter } from 'react-router-dom';
import mockData from 'mocks/data';

const mockedUseAddDataMutation = jest.fn().mockImplementation(() => ([jest.fn(), { isLoading: false }]));
const mockNavigateFn = jest.fn().mockImplementation(() => jest.fn());

jest.mock('./../../api/table.service..ts', () => ({
    useAddDataMutation: () => mockedUseAddDataMutation(),
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigateFn(),
}));

describe('AddPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigateFn.mockClear();
    });

  it('renders correctly', () => {
    render(<BrowserRouter><AddPage /></BrowserRouter>);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter age')).toBeInTheDocument();
    expect(screen.getByLabelText('Verified')).toBeInTheDocument();
  });

  it('validates form fields', async () => {
    render(<BrowserRouter><AddPage /></BrowserRouter>);
    const saveButton = screen.getByRole('button', { name: 'Add user' });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).toBeInTheDocument();
      expect(screen.queryByText('Age is required')).toBeInTheDocument();
    });
  });

  it('submits form with correct data', async () => {
    mockedUseAddDataMutation.mockReturnValueOnce([{
        data: mockData[1]
    }, { isLoading: false }]);

    render(<BrowserRouter><AddPage /></BrowserRouter>);
    userEvent.type(screen.getByPlaceholderText('Enter name'), mockData[1].name);
    userEvent.type(screen.getByPlaceholderText('Enter age'), String(mockData[1].age));
    fireEvent.click(screen.getByLabelText('Verified'));
    const saveButton = screen.getByRole('button', { name: 'Add user' });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockedUseAddDataMutation).toHaveBeenCalled();
      expect(mockNavigateFn).toHaveBeenCalled();
    });
  });
});

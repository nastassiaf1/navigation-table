import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import mockTables from 'mocks/table';
import TablePage from 'pages/tablePage';
import { Provider } from 'react-redux';
import userReducer from 'store/slices/user.slice';
import currentTableReducer from 'store/slices/currentTable.slice';
import { MemoryRouter } from 'react-router-dom';
import { UserRole } from 'constants/user.enum';
import { environment } from 'env/env';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn().mockImplementation(() => jest.fn());
const mockSelector = jest.fn().mockImplementation(() => {
  return mockTables;
});

const mockLocation = jest.fn().mockImplementation(() => ({
  pathname: [environment, '/table']
}));
const mockNavigate = jest.fn().mockImplementation(() => jest.fn());
const mockParams = jest.fn().mockImplementation(() => jest.fn());

const mockGetTablesDataByUserQuery = jest.fn().mockImplementation(() => ({
  data: mockTables,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: null,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation(),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams,
}));

jest.mock('api/table.service.ts', () => ({
    useGetTablesDataByUserQuery: () => mockGetTablesDataByUserQuery(),
}));

jest.mock('components/modalDialogPortal', () => () => <div>ModalDialogPortal Mock</div>);
jest.mock('components/table/addTableDialog', () => () => <div>AddTableDialog Mock</div>);
jest.mock('components/spinner', () => () => <div>Spinner Mock</div>);
jest.mock('components/table', () => () => <div>Table Mock</div>);

const mockStore = configureStore({
  reducer: {
    user: userReducer,
    currentTable: currentTableReducer,
  },
  preloadedState: {
    user: {
      currentUser: { id: '1', name: 'Test User', password: 'test12345', role: UserRole.USER },
    },
    currentTable: {
      currentTable: null,
    },
  },
});

describe('TablePage', () => {
  beforeEach(() => {
    mockGetTablesDataByUserQuery.mockClear();
  });

  it('renders table data and controls correctly', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <TablePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Table Mock')).toBeInTheDocument();
    expect(screen.getByText('Create new table')).toBeInTheDocument();
  });

  it('displays a spinner while loading table data', () => {
    mockGetTablesDataByUserQuery.mockReturnValue({ data: undefined, isLoading: true });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <TablePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Spinner Mock')).toBeInTheDocument();
  });
});

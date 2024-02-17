import { render, screen } from '@testing-library/react';
import mockData from 'mocks/data';
import TablePage from 'pages/table';
import { BrowserRouter } from 'react-router-dom';

const mockedGetTableDataQuery = jest.fn().mockImplementation(() => ({
    data: mockData,
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: null,
}));
const mockedRemoveDataMutation = jest.fn().mockImplementation(() => [
    jest.fn().mockImplementation(() => (mockData[0]))
]);

jest.mock('./../../api/table.service..ts', () => ({
    useGetTableDataQuery: () => mockedGetTableDataQuery(),
    useRemoveDataMutation: () => mockedRemoveDataMutation(),
}));

describe('TablePage', () => {
  beforeEach(() => {
    mockedGetTableDataQuery.mockClear();
    mockedRemoveDataMutation.mockClear();
  });

  it('should render data after API request', async () => {
    render(<BrowserRouter><TablePage /></BrowserRouter>);

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText(mockData[0].name)).toBeDefined();
    expect(screen.getByText(mockData[1].name)).toBeDefined();
  });

  it('should render loading state', async () => {
    mockedGetTableDataQuery.mockReturnValueOnce({
        data: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
    })
    render(<BrowserRouter><TablePage /></BrowserRouter>);

    expect(screen.queryByText('Loading...')).toBeTruthy();
  });

  it('should render error message', async () => {
    const errorMessage = 'Failed to load data';

    mockedGetTableDataQuery.mockReturnValueOnce({
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: new Error(errorMessage),
    })
    render(<BrowserRouter><TablePage /></BrowserRouter>);

    expect(screen.queryByText(`Error loading data: ${errorMessage}`)).toBeTruthy();
  });
});

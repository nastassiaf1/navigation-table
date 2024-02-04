import { render, screen } from '@testing-library/react';
import mockData from './../mocks/data';
import TablePage from 'pages/TablePage';

const mockedGetTableDataQuery = jest.fn();
const mockedRemoveDataMutation = jest.fn();
jest.mock('./../api', () => ({
    useGetTableDataQuery: () => mockedGetTableDataQuery(),
    useRemoveDataMutation: () => mockedRemoveDataMutation(),
}));

describe('TablePage', () => {
  beforeEach(() => {
    mockedGetTableDataQuery.mockClear();
    mockedRemoveDataMutation.mockClear();
  });

  it('should render data after API request', async () => {
    mockedGetTableDataQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });

    mockedRemoveDataMutation.mockReturnValueOnce(jest.fn());

    render(<TablePage />);

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockData[1].name)).toBeInTheDocument();
  });
});
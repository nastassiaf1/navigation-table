import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import TablePage from './../pages/TablePage';
import { tableApi } from '../api';
import { server } from 'mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('renders Table page with data', async () => {
  const store = configureStore({
    reducer: {
      [tableApi.reducerPath]: tableApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tableApi.middleware),
  });

  render(
    <Router>
      <Provider store={store}>
        <TablePage />
      </Provider>
    </Router>
  );

  await waitFor(() => screen.getByText('John'), { timeout: 4000 });

  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();
});

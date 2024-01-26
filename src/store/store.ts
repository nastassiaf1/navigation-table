import { configureStore } from '@reduxjs/toolkit';
import { tableApi } from '../api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [tableApi.reducerPath]: tableApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tableApi.middleware),
});

setupListeners(store.dispatch)

export default store;

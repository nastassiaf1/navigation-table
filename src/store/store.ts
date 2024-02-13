import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tableApi } from 'api/table.service.';
import { userApi } from 'api/user.service';

const store = configureStore({
  reducer: {
    [tableApi.reducerPath]: tableApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tableApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch)

export default store;

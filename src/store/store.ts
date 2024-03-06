import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tableApi } from 'api/table.service';
import { userApi } from 'api/user.service';
import userReducer from './slices/user.slice';
import currentTableReducer from './slices/currentTable.slice';

const store: EnhancedStore = configureStore({
  reducer: {
    user: userReducer,
    currentTable: currentTableReducer,
    [tableApi.reducerPath]: tableApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tableApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;

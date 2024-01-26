import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './store/store';

const root = createRoot(document.getElementById('app')!);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = createRoot(document.getElementById('app')!);
root.render(<RouterProvider router={router}></RouterProvider>);

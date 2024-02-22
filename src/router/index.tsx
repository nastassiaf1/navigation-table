import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import About from "../pages/about";
import Preview from "../components/preview";
import TablePage from "../pages/tablePage";
import UserPage from "../pages/userPage";
import RequireAuth from "./guards/table";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
              errorElement: <ErrorPage />,
              children: [
                {
                    path: "/",
                    element: <Preview />,
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/table/:tableId?",
                    element: (
                        <RequireAuth>
                            <TablePage />
                        </RequireAuth>
                    ),
                },
                {
                    path: "/user/:userId",
                    element: (
                        <RequireAuth>
                            <UserPage />
                        </RequireAuth>
                    ),
                },
                { path: "login", element: <Outlet /> },
                { path: "registration", element: <Outlet /> },
              ]
            }
        ],
    }
]);

export default router;

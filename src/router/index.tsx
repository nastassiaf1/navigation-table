import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import AboutPage from "../pages/aboutPage";
import Preview from "../components/preview";
import TablePage from "../pages/tablePage";
import UserPage from "../pages/userPage";
import TablePreviewPage from "pages/tablePreviewPage";
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
                    element: <Outlet />,
                    children: [
                        {
                            path: "",
                            element: (
                                <AboutPage />
                            ),
                        },
                        {
                            path: "preview",
                            element: (
                                <TablePreviewPage />
                            ),
                        },
                    ]
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

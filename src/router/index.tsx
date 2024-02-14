import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import About from "../pages/about";
import Preview from "../components/preview";
import Table from "../pages/tablePage";
import EditPage from "../pages/editPage";
import AddPage from "../pages/addPage";
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
                    path: "/table",
                    element: (
                        <RequireAuth>
                            <Table />
                        </RequireAuth>
                    ),
                },
                {
                    path: "/table/:rowId/edit",
                    element: (
                        <RequireAuth>
                            <EditPage />
                        </RequireAuth>
                    ),
                },
                {
                    path: "/table/add",
                    element: (
                        <RequireAuth>
                            <AddPage />
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

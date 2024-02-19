import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/errorPage";
import About from "../pages/about";
import Preview from "../components/preview";
import Table from "../pages/table";
//import EditPage from "../pages/table/editPage";
import AddRowPage from "../pages/table/addRowPage";
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
                            <Table />
                        </RequireAuth>
                    ),
                },
                /*{
                    path: "/table/:rowId/edit",
                    element: (
                        <RequireAuth>
                            <EditPage />
                        </RequireAuth>
                    ),
                },*/
                {
                    path: "/table/:tableId/add",
                    element: (
                        <RequireAuth>
                            <AddRowPage />
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

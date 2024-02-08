import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/errorPage";
import About from "./pages/about";
import Main from "./components/main";
import Table from "./pages/tablePage";
import EditPage from "./pages/editPage";
import AddPage from "./pages/addPage";

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
                    element: <Main />,
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/table",
                    element: <Table />,
                },
                {
                    path: "/table/:rowId/edit",
                    element: <EditPage />,
                },
                {
                    path: "/table/add",
                    element: <AddPage />,
                },
              ]
            }
        ],
    }
]);

export default router;

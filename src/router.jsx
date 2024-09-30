import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/authentication/Login";
import GuestLayout from "./components/layouts/GuestLayout";
import NotFound from "./views/NotFound";
import Dashboard from "./views/dashboard/Dashboard";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersIndex from "./views/users/UsersIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        //This will redirect to this url every time the user enters the "/".
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // ***** USERS *****
      {
        path: "/users",
        element: <UsersIndex />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

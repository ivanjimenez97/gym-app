import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/authentication/Login";
import GuestLayout from "./components/layouts/GuestLayout";
import NotFound from "./views/NotFound";
import Dashboard from "./views/dashboard/Dashboard";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersIndex from "./views/users/UsersIndex";
import CreateUser from "./views/users/CreateUser";
import EditUser from "./views/users/EditUser";
import MembersIndex from "./views/members/MembersIndex";
import CreateMember from "./views/members/CreateMember";
import EditMember from "./views/members/EditMember";

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
        path: "/users/create",
        element: <CreateUser />,
      },
      {
        path: "/users/edit/:id",
        element: <EditUser />,
      },
      // ***** Members *****
      {
        path: "/members",
        element: <MembersIndex />,
      },
      {
        path: "/members/create",
        element: <CreateMember />,
      },
      {
        path: "/members/edit/:id",
        element: <EditMember />,
      },
      // ***** NOT FOUND *****
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

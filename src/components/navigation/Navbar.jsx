import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosClient from "../../AxiosClient";
import { useAuthContext } from "../../contexts/AuthProvider.jsx";
import MdiLightViewDashboard from "../icons/MdiLightViewDashboard";
import UsersGroupSolid from "../icons/UsersGroupSolid";

export default function Navbar() {
  const { user, setUser, setToken } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then((res) => {
      setUser({});
      setToken(null);
      console.log("Logout", res);
    });
  };
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <header className="mb-20 md:mb-0">
      <nav className="bg-white md:bg-transparent shadow md:shadow-none fixed md:relative w-full top-0 z-50 left-0">
        <div className="md:hidden flex justify-between items-center p-3">
          <Link to={"/"} className="flex items-center">
            <span className="text-lg text-indigo-600 font-bold ml-2">
              Gym App
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-600 focus:outline-none"
            title="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg w-full">
            <NavLink
              to={"/dashboard"}
              activeClassName="bg-indigo-500 text-white"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-700 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <MdiLightViewDashboard className="w-6 h-6" />
              <span className="ml-3">Dashboard</span>
            </NavLink>

            <NavLink
              to={"/companies"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-700 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <span className="ml-3">Empresas</span>
            </NavLink>

            <NavLink
              to={"/catalogs"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-700 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <span className="ml-3">Catalogos</span>
            </NavLink>

            <NavLink
              to={"/users"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-700 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <UsersGroupSolid className="w-6 h-6" />
              <span className="ml-3">Usuarios</span>
            </NavLink>
            <div className="profile px-3 py-1 bg-red-200 hover:bg-red-500 text-zinc-700">
              <p className=" font-semibold">{user.name} &nbsp; &nbsp;</p>
              <Link to={"#"} onClick={onLogout} className=" hover:text-white">
                Cerrar Sesion
              </Link>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <div className="hidden md:block profile px-3 py-1 text-zinc-700 hover:bg-indigo-500 hover:rounded-lg">
            <p className="text-zinc-700 font-semibold">
              {user.name} &nbsp; &nbsp;
            </p>
            <Link
              to={"#"}
              onClick={onLogout}
              className="hover:text-white hover:font-medium"
            >
              Cerrar Sesion
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

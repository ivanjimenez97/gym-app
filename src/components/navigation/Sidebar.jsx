import { Link, NavLink } from "react-router-dom";
import MdiLightViewDashboard from "../icons/MdiLightViewDashboard";
import UsersGroupSolid from "../icons/UsersGroupSolid";

export default function Sidebar() {
  return (
    <aside className="sidebar bg-white lg:w-[240px] min-h-screen hidden md:block">
      <Link to={"/"} className="flex items-center py-3 px-5">
        <h2 className="text-xl text-center pt-3 px-3 mb-5 text-indigo-600 font-bold leading-5 hidden lg:block">
          Gym App
        </h2>
      </Link>
      <NavLink
        to={"/dashboard"}
        activeClassName="border-r-5 border-indigo-500 font-bold text-indigo-500"
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-500 font-bold text-indigo-500 flex items-center py-3 px-5"
            : "text-gray-500 hover:text-indigo-400 flex items-center py-3 px-5"
        }
      >
        <MdiLightViewDashboard className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Dashboard</span>
      </NavLink>

      <NavLink
        to={"/companies"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-500 font-bold text-indigo-500 flex items-center py-3 px-5"
            : "text-gray-500 hover:text-indigo-400 flex items-center py-3 px-5"
        }
      >
        <span className="hidden lg:block px-3">Empresas</span>
      </NavLink>

      <NavLink
        to={"/catalogs"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-500 font-bold text-indigo-500 flex items-center py-3 px-5"
            : "text-gray-500 hover:text-indigo-400 flex items-center py-3 px-5"
        }
      >
        <span className="hidden lg:block px-3">Catalogos</span>
      </NavLink>

      <NavLink
        to={"/users"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-500 font-bold text-indigo-500 flex items-center py-3 px-5"
            : "text-gray-500 hover:text-indigo-400 flex items-center py-3 px-5"
        }
      >
        <UsersGroupSolid className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Usuarios</span>
      </NavLink>
    </aside>
  );
}

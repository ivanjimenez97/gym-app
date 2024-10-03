import { Link, NavLink } from "react-router-dom";
import MdiLightViewDashboard from "../icons/MdiLightViewDashboard";
import UsersGroupSolid from "../icons/UsersGroupSolid";
import BarbellIcon from "../icons/BarbellIcon.jsx";
import { SubscriptionIcon } from "../icons/SubscriptionIcon";
import { MembersIcon } from "../icons/MembersIcon";
import { PlansIcon } from "../icons/PlansIcon";

export default function Sidebar() {
  return (
    <aside className="sidebar bg-white lg:w-[240px] min-h-screen hidden md:block">
      <Link
        to={"/"}
        className="flex justify-center items-center pt-5 pb-3 px-5 text-2xl text-center mb-2 text-indigo-700 font-bold leading-5"
      >
        <BarbellIcon className="w-[1.75rem] h-[1.75rem]" />{" "}
        <span className="hidden lg:block px-3">Gym App</span>
      </Link>

      <NavLink
        to={"/comments"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-500 font-bold text-indigo-500 flex justify-center lg:justify-start items-center py-3 px-5"
            : "text-gray-500 hover:text-indigo-400 flex justify-center lg:justify-start items-center py-3 px-5"
        }
      >
        <UsersGroupSolid className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Comments</span>
      </NavLink>

      <NavLink
        to={"/users"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-500 font-bold text-indigo-500 flex justify-center lg:justify-start items-center py-3 px-5"
            : "text-gray-500 hover:text-indigo-400 flex justify-center lg:justify-start items-center py-3 px-5"
        }
      >
        <UsersGroupSolid className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Users</span>
      </NavLink>
    </aside>
  );
}

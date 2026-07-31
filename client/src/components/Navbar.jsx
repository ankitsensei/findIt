import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-black" : "text-zinc-500 hover:text-black"
    }`;

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-zinc-200 fixed top-0 left-0 right-0 z-50">
      <NavLink to="/" className="text-xl font-bold text-black tracking-tight">
        findIt
      </NavLink>
      <div className="flex items-center gap-6">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/lostit" className={linkClass}>
          Lost It
        </NavLink>
        <NavLink to="/foundit" className={linkClass}>
          Found It
        </NavLink>
        <div className="flex gap-1 px-1 py-1 rounded-full bg-white text-sm">
          <NavLink
            to="/signin"
            className={`${linkClass} px-2 bg-zinc-200 rounded-2xl`}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={`${linkClass} px-2 bg-zinc-200 rounded-2xl`}
          >
            Singup
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

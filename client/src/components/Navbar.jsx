import { useState } from "react";
import { Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Logo from "../assets/logo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const linkClass = ({ isActive }) =>
    `relative rounded-md px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-zinc-900 text-white shadow-sm"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-zinc-900 text-white"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  const handleLogout = () => {
    localStorage.setItem("token", "");
    toast.success("Logged out successfully");
    setMenuOpen(false);
    setUserMenuOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg ring-1 ring-zinc-200">
            <img
              src={Logo}
              alt="findIt logo"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-900">
            findIt
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/lostit" className={linkClass}>
              Lost Items
            </NavLink>
            <NavLink to="/foundit" className={linkClass}>
            My finds
            </NavLink>
            <span className="mx-1 h-5 w-px bg-zinc-200" />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-1.5 rounded-full p-1 pr-2.5 transition-colors hover:bg-zinc-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <User size={16} strokeWidth={2} />
                  </span>
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={`text-zinc-500 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg shadow-zinc-900/5">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setMenuOpen(false);
                          navigate("/profile");
                        }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
                      >
                        <LogOut size={14} strokeWidth={2} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 lg:hidden cursor-pointer"
          >
            {menuOpen ? (
              <X key="close" size={20} strokeWidth={2} className="nav-icon" />
            ) : (
              <Menu key="menu" size={20} strokeWidth={2} className="nav-icon" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-200/80 bg-white/95 px-4 py-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            <NavLink
              to="/"
              className={mobileLinkClass}
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/lostit"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Lost Items
            </NavLink>
            <NavLink
              to="/foundit"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              My Finds
            </NavLink>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200 pt-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="rounded-lg bg-zinc-100 px-4 py-2.5 text-center text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-200 cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-zinc-100 px-4 py-2.5 text-center text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-200"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { Menu, X, User, ChevronDown, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Logo from "../assets/logo.jpeg";
import { API_BASE_URL } from "../config";
import {
  getStoredUser,
  setStoredUser,
  USER_UPDATED_EVENT,
} from "../userSession";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(getStoredUser);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());

    window.addEventListener(USER_UPDATED_EVENT, syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let cancelled = false;

    const loadUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;

        const currentUser = await response.json();
        if (!cancelled) setStoredUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors duration-150 cursor-pointer ${
      isActive
        ? "bg-card text-ink shadow-card ring-1 ring-edge"
        : "text-body hover:text-ink"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2.5 text-sm transition-colors cursor-pointer ${
      isActive
        ? "bg-card text-ink ring-1 ring-edge"
        : "text-body hover:bg-soft-surface hover:text-ink"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setStoredUser(null);
    toast.success("Logged out successfully");
    setMenuOpen(false);
    setUserMenuOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-edge bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-[52px] max-w-[1024px] items-center justify-between gap-4 px-4 sm:px-10">
        <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md ring-1 ring-edge">
            <img
              src={Logo}
              alt="findIt logo"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-lg font-medium tracking-[-0.01em] text-ink">
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
              Found Items
            </NavLink>
            <NavLink to="/mylosts" className={linkClass}>
              Lost by Me
            </NavLink>

            <NavLink to="/myfounds" className={linkClass}>
              Found by Me
            </NavLink>
            <span className="mx-1.5 h-5 w-px bg-edge" />
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-1.5 rounded-full p-1 pr-2.5 transition-colors hover:bg-soft-surface cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-ink text-xs font-medium text-canvas">
                    {user?.profile_pic_url ? (
                      <img
                        src={user.profile_pic_url}
                        alt={`${user.username || "User"} profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : user?.username ? (
                      getInitials(user.username)
                    ) : (
                      <User size={16} strokeWidth={2} />
                    )}
                  </span>
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={`text-muted transition-transform duration-200 ${
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
                    <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-card border border-edge bg-card p-1.5 shadow-card">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setMenuOpen(false);
                          navigate("/profile");
                        }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-body transition-colors hover:bg-soft-surface hover:text-ink cursor-pointer"
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
                  className="rounded-md px-3 py-1.5 text-sm text-body transition-colors hover:text-ink cursor-pointer"
                >
                  Log in
                </NavLink>
                <NavLink to="/signup" className="btn-primary btn-nav">
                  Sign up
                </NavLink>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-body transition-colors hover:bg-soft-surface hover:text-ink lg:hidden cursor-pointer"
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
        <div className="border-t border-edge bg-canvas/95 px-4 py-4 backdrop-blur-md lg:hidden">
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
              Found Items
            </NavLink>
            <NavLink
              to="/mylosts"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Lost by Me
            </NavLink>

            <NavLink
              to="/myfounds"
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Found by Me
            </NavLink>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-edge pt-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="btn-secondary w-full cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-primary w-full cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary w-full"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full"
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

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Home,
  PackageSearch,
  PackageCheck,
  PackageOpen,
  History,
  PackagePlus,
  CirclePlus,
  Menu,
  X,
  UserRound,
  ChevronDown,
  LogOut,
} from "lucide-react";
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

const NAV_SECTIONS = [
  {
    label: "Board",
    items: [
      { to: "/", label: "Home", icon: Home, end: true },
      { to: "/lostit", label: "Lost items", icon: PackageSearch },
      { to: "/foundit", label: "Found items", icon: PackageCheck },
    ],
  },
  {
    label: "Your reports",
    items: [
      { to: "/mylosts", label: "Lost by me", icon: PackageOpen },
      { to: "/myfounds", label: "Found by me", icon: History },
    ],
  },
  {
    label: "New report",
    items: [
      { to: "/createlostitem", label: "Report a loss", icon: PackagePlus },
      { to: "/createfounditem", label: "Report a find", icon: CirclePlus },
    ],
  },
];

const AppShell = ({ children }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setStoredUser(null);
    toast.success("Logged out successfully");
    setUserMenuOpen(false);
    setDrawerOpen(false);
    navigate("/signin");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors duration-150 cursor-pointer ${
      isActive
        ? "bg-blue-wash font-medium text-blue-ink"
        : "text-body hover:bg-soft-surface hover:text-ink"
    }`;

  const renderBrand = (onNavigate) => (
    <NavLink
      to="/"
      end
      onClick={onNavigate}
      className="flex items-center gap-2.5 px-3"
    >
      <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg ring-1 ring-edge">
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
  );

  const renderNav = (onNavigate) => (
    <nav className="flex-1 overflow-y-auto px-3 pb-4">
      {NAV_SECTIONS.map((section, sectionIndex) => (
        <div
          key={section.label}
          className={sectionIndex === 0 ? "pt-2" : "pt-5"}
        >
          <p className="px-2.5 pb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted">
            {section.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={navItemClass}
              >
                <item.icon size={16} strokeWidth={1.8} className="shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  const renderUserArea = (onNavigate) => (
    <div className="border-t border-edge p-3">
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className="flex w-full items-center gap-3 rounded-xl border border-edge bg-canvas px-3 py-2.5 text-left transition-colors hover:bg-soft-surface cursor-pointer"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink text-xs font-medium text-canvas">
              {user?.profile_pic_url ? (
                <img
                  src={user.profile_pic_url}
                  alt={`${user.username || "User"} profile`}
                  className="h-full w-full object-cover"
                />
              ) : user?.username ? (
                getInitials(user.username)
              ) : (
                <UserRound size={14} strokeWidth={2} />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">
                {user?.username || "Account"}
              </span>
              <span className="block truncate text-xs text-muted">
                {user?.email || "Signed in"}
              </span>
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2}
              className={`shrink-0 text-muted transition-transform duration-200 ${
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
              <div className="absolute bottom-full left-0 right-0 z-20 mb-2 rounded-xl border border-edge bg-card p-1.5 shadow-card">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setDrawerOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-body transition-colors hover:bg-soft-surface hover:text-ink cursor-pointer"
                >
                  <UserRound size={14} strokeWidth={2} />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
                >
                  <LogOut size={14} strokeWidth={2} />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <NavLink
            to="/signin"
            onClick={onNavigate}
            className="btn-secondary w-full"
          >
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            onClick={onNavigate}
            className="btn-primary w-full"
          >
            Sign up
          </NavLink>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas">
      {/* Mobile top bar */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-[52px] items-center justify-between border-b border-edge bg-card/90 px-4 backdrop-blur-md lg:hidden">
        {renderBrand(() => setDrawerOpen(false))}
        <button
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={drawerOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-body transition-colors hover:bg-soft-surface hover:text-ink cursor-pointer"
        >
          {drawerOpen ? (
            <X key="close" size={20} strokeWidth={2} />
          ) : (
            <Menu key="menu" size={20} strokeWidth={2} />
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] max-w-[85vw] flex-col border-r border-edge bg-card shadow-xl">
            <div className="pb-3 pt-4">
              {renderBrand(() => setDrawerOpen(false))}
            </div>
            {renderNav(() => setDrawerOpen(false))}
            {renderUserArea(() => setDrawerOpen(false))}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-edge bg-card lg:flex">
        <div className="pb-3 pt-5">{renderBrand()}</div>
        {renderNav()}
        {renderUserArea()}
      </aside>

      {/* Content */}
      <div className="lg:pl-[248px]">
        <main className="mx-auto max-w-[1120px] px-4 pb-12 pt-[72px] md:px-8 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;

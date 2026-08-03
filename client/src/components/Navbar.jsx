import { useState } from "react";
import { User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-black" : "text-zinc-500 hover:text-black"
    }`;
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex gap-1 px-1 py-1 rounded-full bg-white text-sm relative">
          {localStorage.getItem("token") ? (
            <div>
              {isOpen && (
                <div className="fixed top-15 right-2 flex flex-col items-start gap-1 bg-zinc-300 w-40 rounded-md px-1 py-1">
                  <button className="bg-white px-2 py-1 w-full text-start rounded">
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem("token", "");
                      toast.success("Logout successful");
                      setIsOpen(false);
                      setTimeout(() => {
                        navigate("/signin");
                      }, 300);
                    }}
                    className="bg-white px-2 py-1 w-full text-start rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className="p-1">
                <User className="" size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-1">
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

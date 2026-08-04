import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  User,
  Mail,
  Calendar,
  Package,
  Search,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Loader2,
  Pencil,
  RotateCcw,
  FileText,
  Box,
} from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    lostPosted: 0,
    foundPosted: 0,
    returned: 0,
    totalReports: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        toast.error("Session expired. Please sign in again.");
        localStorage.removeItem("token");
        navigate("/signin");
        return;
      }
      const user = await response.json();
      setUserData(user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
    handleUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
            Profile
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Your account overview and activity.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white text-2xl font-semibold tracking-tight">
                {getInitials(userData?.username)}
              </div>

              <div className="flex flex-1 flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-zinc-900">
                  {userData?.username || "Unnamed User"}
                </h2>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Mail size={14} strokeWidth={1.8} />
                  {userData?.email}
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Calendar size={14} strokeWidth={1.8} />
                  Member
                </div>

                {userData?.id && (
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
                    <ShieldCheck size={12} />
                    Verified account
                  </div>
                )}
              </div>

              <button className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer">
                <Pencil size={14} strokeWidth={2} />
                Edit profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white">
                <Package size={16} strokeWidth={1.8} />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                {stats.lostPosted}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">Lost posted</p>
            </div>

            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                <Search size={16} strokeWidth={1.8} />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                {stats.foundPosted}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">Found posted</p>
            </div>

            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <RotateCcw size={16} strokeWidth={1.8} />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                {stats.returned}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">Returned</p>
            </div>

            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                <FileText size={16} strokeWidth={1.8} />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                {stats.totalReports}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">Total reports</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <NavLink
              to="/lostit"
              className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition group-hover:bg-zinc-800">
                <Package size={20} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900">Lost it</p>
                <p className="mt-0.5 text-xs text-zinc-500">Report an item</p>
              </div>
              <ChevronRight
                size={16}
                className="ml-auto shrink-0 text-zinc-300 transition group-hover:text-zinc-500 group-hover:translate-x-0.5"
              />
            </NavLink>

            <NavLink
              to="/foundit"
              className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 transition group-hover:bg-zinc-900 group-hover:text-white">
                <Search size={20} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900">Found it</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  List a found item
                </p>
              </div>
              <ChevronRight
                size={16}
                className="ml-auto shrink-0 text-zinc-300 transition group-hover:text-zinc-500 group-hover:translate-x-0.5"
              />
            </NavLink>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-200 cursor-pointer"
          >
            <LogOut size={16} strokeWidth={1.8} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

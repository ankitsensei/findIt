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
  X,
  Check,
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
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [usernameDraft, setUsernameDraft] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        toast.error("Session expired. Please sign in again.");
        // localStorage.removeItem("token");
        // navigate("/signin");
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

  const openEdit = () => {
    setUsernameDraft(userData?.username || "");
    setUsernameError("");
    setOpenEditWindow(true);
  };

  const closeEdit = () => {
    setOpenEditWindow(false);
    setUsernameError("");
  };

  const validateUsername = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Username is required";
    if (trimmed.length < 5) return "Username must be at least 5 characters";
    if (trimmed.length > 30) return "Username cannot exceed 30 characters";
    if (!/^[a-zA-Z0-9._]+$/.test(trimmed))
      return "Only letters, numbers, periods (.) and underscores (_) are allowed";
    return "";
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsernameDraft(value);
    setUsernameError(validateUsername(value));
  };

  const handleSaveUsername = async () => {
    const error = validateUsername(usernameDraft);
    if (error) {
      setUsernameError(error);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/updateuser/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username: usernameDraft.trim() }),
        },
      );
      const updatedUser = await response.json();
      if (!response.ok) {
        toast.error(updatedUser.message);
        return;
      }
      setUserData(updatedUser);
      setOpenEditWindow(false);
      toast.success("Username updated successfully");
    } catch (error) {
      console.error(error);
    }
    // setUserData((prev) => ({ ...prev, username: usernameDraft.trim() }));
    // setOpenEditWindow(false);
    // toast.success("Username updated successfully");
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

        <div className="flex flex-col gap-6 relative">
          {openEditWindow && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
                onClick={closeEdit}
              />
              <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">
                      Edit profile
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      You can only change your username
                    </p>
                  </div>
                  <button
                    onClick={closeEdit}
                    aria-label="Close"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 cursor-pointer"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>

                <div className="flex flex-col gap-5 px-6 py-5">
                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white text-lg font-semibold tracking-tight">
                      {getInitials(usernameDraft.trim() || userData?.username)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900">
                        {usernameDraft.trim() || "Unnamed User"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {userData?.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-username"
                      className="mb-1.5 block text-sm font-medium text-zinc-700"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        strokeWidth={2}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                      <input
                        id="edit-username"
                        type="text"
                        autoFocus
                        placeholder="johndoe"
                        value={usernameDraft}
                        onChange={handleUsernameChange}
                        className={`w-full rounded-xl border py-2.5 pl-11 pr-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:ring-2 ${
                          usernameError
                            ? "border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-100"
                            : "border-zinc-300 bg-white focus:border-zinc-900 focus:ring-zinc-200"
                        }`}
                      />
                      {!usernameError && usernameDraft.length > 0 && (
                        <Check
                          size={16}
                          strokeWidth={2}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
                        />
                      )}
                    </div>
                    {usernameError ? (
                      <p className="mt-1.5 text-xs text-red-600">
                        {usernameError}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-zinc-400">
                        {usernameDraft.length}/30 characters
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-6 py-4">
                  <button
                    onClick={closeEdit}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUsername}
                    disabled={Boolean(usernameError) || !usernameDraft.trim()}
                    className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          )}

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

              <button
                onClick={openEdit}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer"
              >
                <Pencil size={14} strokeWidth={2} />
                Edit profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
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

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <NavLink
              to="/createlostitem"
              className="group flex flex-col md:flex-row items-start md:items-center gap-4 rounded-2xl border border-blue-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
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
              to="/createfounditem"
              className="group flex flex-col md:flex-row items-start md:items-center gap-4 rounded-2xl border border-blue-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
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

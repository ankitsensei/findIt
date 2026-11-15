import { useState, useEffect, useRef } from "react";
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
  X,
  Check,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import { setStoredUser } from "../userSession";

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
  const [resolvedItems, setResolvedItems] = useState([]);
  const [unresolvingId, setUnresolvingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [usernameDraft, setUsernameDraft] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const handleUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        toast.error("Session expired. Please sign in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setStoredUser(null);
        navigate("/signin");
        return;
      }
      const user = await response.json();
      setUserData(user);
      setStoredUser(user);

      try {
        const statsResponse = await fetch(
          `${API_BASE_URL}/me/stats`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const resolvedResponse = await fetch(
          `${API_BASE_URL}/me/resolvedItems`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (resolvedResponse.ok) {
          const resolvedData = await resolvedResponse.json();
          setResolvedItems(resolvedData.items ?? []);
        }
      } catch (error) {
        console.error(error);
      }
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
    localStorage.removeItem("userId");
    setStoredUser(null);
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

  useEffect(() => {
    if (!openEditWindow) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeEdit();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openEditWindow]);

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
        `${API_BASE_URL}/updateuser/${userData.id}`,
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
      setStoredUser(updatedUser);
      setOpenEditWindow(false);
      toast.success("Username updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setUploadingAvatar(true);

    try {
      const response = await fetch(`${API_BASE_URL}/me/profile-pic`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const updatedUser = await response.json();

      if (!response.ok) {
        throw new Error(
          updatedUser.message || "Failed to update profile picture",
        );
      }

      setUserData(updatedUser);
      setStoredUser(updatedUser);
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(error.message || "Failed to update profile picture");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUnresolve = async (item) => {
    setUnresolvingId(item.id);
    try {
      const response = await fetch(
        `${API_BASE_URL}/${item.type}Items/${item.id}/unresolve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || "Failed to reactivate item");
      setResolvedItems((prev) => prev.filter((i) => i.id !== item.id));
      setStats((prev) => ({ ...prev, returned: Math.max(0, prev.returned - 1) }));
      toast.success("Item marked as active");
    } catch (error) {
      toast.error(error.message || "Failed to reactivate item");
    } finally {
      setUnresolvingId(null);
    }
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
      <div className="min-h-screen bg-canvas pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="type-heading">
            Profile
          </h1>
          <p className="mt-1.5 text-sm text-secondary">
            Your account overview and activity.
          </p>
        </div>

        <div className="flex flex-col gap-6 relative">
          {openEditWindow && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                onClick={closeEdit}
              />
              <div className="relative w-full max-w-md card shadow-xl">
                <div className="flex items-center justify-between border-b border-edge px-6 py-4">
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      Edit profile
                    </h3>
                    <p className="mt-0.5 text-xs text-body">
                      You can only change your username
                    </p>
                  </div>
                  <button
                    onClick={closeEdit}
                    aria-label="Close"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-soft-surface hover:text-body cursor-pointer"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>

                <div className="flex flex-col gap-5 px-6 py-5">
                  <div className="flex items-center gap-4 rounded-card border border-edge bg-soft-surface p-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink text-lg font-semibold tracking-tight text-white">
                      {userData?.profile_pic_url ? (
                        <img
                          src={userData.profile_pic_url}
                          alt={`${userData.username || "User"} profile`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(
                          usernameDraft.trim() || userData?.username,
                        )
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">
                        {usernameDraft.trim() || "Unnamed User"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-body">
                        {userData?.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-username"
                      className="label"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        strokeWidth={2}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="edit-username"
                        type="text"
                        autoFocus
                        placeholder="johndoe"
                        value={usernameDraft}
                        onChange={handleUsernameChange}
                        className={`field pl-11 pr-3.5 ${usernameError ? "field-error" : ""}`}
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
                      <p className="mt-1.5 text-xs text-muted">
                        {usernameDraft.length}/30 characters
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-edge px-6 py-4">
                  <button
                    onClick={closeEdit}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUsername}
                    disabled={Boolean(usernameError) || !usernameDraft.trim()}
                    className="btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <div className="card p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex shrink-0 flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  aria-label="Change profile picture"
                  className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-ink text-2xl font-semibold tracking-tight text-white ring-1 ring-edge transition hover:ring-pale-ink disabled:cursor-wait"
                >
                  {userData?.profile_pic_url ? (
                    <img
                      src={userData.profile_pic_url}
                      alt={`${userData.username || "User"} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(userData?.username)
                  )}
                  {uploadingAvatar ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/60">
                      <Loader2 size={20} className="animate-spin text-white" />
                    </span>
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Camera size={18} strokeWidth={2} />
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="text-xs font-medium text-body transition hover:text-ink disabled:cursor-wait disabled:opacity-60"
                >
                  {uploadingAvatar ? "Uploading..." : "Change photo"}
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-ink">
                  {userData?.username || "Unnamed User"}
                </h2>

                <div className="flex items-center gap-2 text-sm text-body">
                  <Mail size={14} strokeWidth={1.8} />
                  {userData?.email}
                </div>

                <div className="flex items-center gap-2 text-sm text-body">
                  <Calendar size={14} strokeWidth={1.8} />
                  <span>Joined to findIt:</span>
                  <span>
                    {new Date(userData?.created_at).toLocaleDateString("en-GB")}
                  </span>
                </div>

                {userData?.id && (
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-edge bg-soft-surface px-2.5 py-0.5 text-xs font-medium text-body">
                    <ShieldCheck size={12} />
                    Verified account
                  </div>
                )}
              </div>

              <button
                onClick={openEdit}
                className="flex shrink-0 items-center gap-2 btn-secondary"
              >
                <Pencil size={14} strokeWidth={2} />
                Edit profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="flex flex-col card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-wash text-blue-ink">
                <Package size={16} strokeWidth={1.8} />
              </div>
              <p className="font-display text-[26px] text-ink">
                {stats.lostPosted}
              </p>
              <p className="mt-0.5 text-xs text-body">Lost posted</p>
            </div>

            <div className="flex flex-col card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-wash text-blue-ink">
                <Search size={16} strokeWidth={1.8} />
              </div>
              <p className="font-display text-[26px] text-ink">
                {stats.foundPosted}
              </p>
              <p className="mt-0.5 text-xs text-body">Found posted</p>
            </div>

            <div className="flex flex-col card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <RotateCcw size={16} strokeWidth={1.8} />
              </div>
              <p className="font-display text-[26px] text-ink">
                {stats.returned}
              </p>
              <p className="mt-0.5 text-xs text-body">Returned</p>
            </div>

            <div className="flex flex-col card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-wash text-blue-ink">
                <FileText size={16} strokeWidth={1.8} />
              </div>
              <p className="font-display text-[26px] text-ink">
                {stats.totalReports}
              </p>
              <p className="mt-0.5 text-xs text-body">Total reports</p>
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg text-ink">
                  Resolved items
                </h2>
                <p className="mt-0.5 text-xs text-body">
                  Items you've marked as returned. You can reactivate them.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {resolvedItems.length}
              </span>
            </div>

            {resolvedItems.length === 0 ? (
              <div className="mt-5 flex flex-col items-center rounded-lg border border-dashed border-pale-ink bg-soft-surface/60 px-4 py-10 text-center">
                <RotateCcw size={20} strokeWidth={1.8} className="text-muted" />
                <p className="mt-3 text-sm font-medium text-body">
                  No resolved items yet
                </p>
                <p className="mt-1 text-xs text-muted">
                  Items you mark as resolved will show up here.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {resolvedItems.map((item) => (
                  <article
                    key={`${item.type}-${item.id}`}
                    className="flex flex-col card overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-soft-surface">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-white backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Resolved
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-3 md:p-4">
                      <h3 className="text-sm font-medium text-ink">
                        {item.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-body">
                        {item.description}
                      </p>

                      <div className="mt-3 flex flex-col gap-2">
                        <NavLink
                          to={
                            item.type === "lost"
                              ? `/lostit/${item.id}`
                              : `/foundit/${item.id}`
                          }
                          className="block w-full rounded-lg border border-edge py-1.5 text-center text-xs font-medium text-secondary transition hover:border-blue hover:text-blue"
                        >
                          View details
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => handleUnresolve(item)}
                          disabled={unresolvingId === item.id}
                          className="flex w-full items-center justify-center gap-1.5 btn-primary h-9 text-xs"
                        >
                          <RotateCcw size={12} strokeWidth={2} />
                          {unresolvingId === item.id
                            ? "Reactivating..."
                            : "Mark as active"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <NavLink
              to="/createlostitem"
              className="group flex flex-col md:flex-row items-start md:items-center gap-4 card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-wash text-blue-ink transition group-hover:bg-blue group-hover:text-on-blue">
                <Package size={20} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">Lost it</p>
                <p className="mt-0.5 text-xs text-body">Report an item</p>
              </div>
              <ChevronRight
                size={16}
                className="ml-auto shrink-0 text-pale-ink transition group-hover:text-body group-hover:translate-x-0.5"
              />
            </NavLink>

            <NavLink
              to="/createfounditem"
              className="group flex flex-col md:flex-row items-start md:items-center gap-4 card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-wash text-blue-ink transition group-hover:bg-blue group-hover:text-on-blue">
                <Search size={20} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">Found it</p>
                <p className="mt-0.5 text-xs text-body">
                  List a found item
                </p>
              </div>
              <ChevronRight
                size={16}
                className="ml-auto shrink-0 text-pale-ink transition group-hover:text-body group-hover:translate-x-0.5"
              />
            </NavLink>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-2xl border border-edge bg-card px-6 py-4 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-200 cursor-pointer"
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

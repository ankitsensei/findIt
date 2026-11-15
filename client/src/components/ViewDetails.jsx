import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { MapPin, Clock, ArrowLeft, User } from "lucide-react";
import toast from "react-hot-toast";
import MapView from "./MapView";
import { API_BASE_URL } from "../config";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const path = window.location.pathname;
  const type = path.startsWith("/lostit") ? "lost" : "found";

  const [item, setItem] = useState(null);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [isUnresolving, setIsUnresolving] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/${type}Items/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        setItem(json[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, type]);

  useEffect(() => {
    if (!item) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${item.user_id}`);
        const json = await res.json();
        setUser(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [item]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas">
        <p className="text-lg text-body">Item not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 link-blue text-sm font-medium"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact-owner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          itemId: id,
          message: message.trim(),
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to send message");
      }

      toast.success(json.message || "Message sent to the owner");
      setShowContactModal(false);
      setMessage("");
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const hasCoords =
    typeof item.latitude === "number" &&
    typeof item.longitude === "number" &&
    Number.isFinite(item.latitude) &&
    Number.isFinite(item.longitude);

  const isResolved = item.status === "resolved";
  const isOwner = String(item.user_id) === String(currentUserId);

  const handleResolveItem = async () => {
    setIsResolving(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/${type}Items/${id}/resolve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to resolve item");
      setItem({ ...item, status: "resolved" });
      toast.success("Item marked as resolved");
    } catch (error) {
      toast.error(error.message || "Failed to resolve item");
    } finally {
      setIsResolving(false);
    }
  };

  const handleUnresolveItem = async () => {
    setIsUnresolving(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/${type}Items/${id}/unresolve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to reactivate item");
      setItem({ ...item, status: "active" });
      toast.success("Item marked as active");
    } catch (error) {
      toast.error(error.message || "Failed to reactivate item");
    } finally {
      setIsUnresolving(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas pt-22 md:pt-26 pb-8 md:pb-12 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-body hover:text-ink transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="card overflow-hidden">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full aspect-[16/9] object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="type-heading">{item.name}</h1>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    type === "lost"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {type === "lost" ? "LOST" : "FOUND"}
                </span>
                {isResolved && (
                  <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    RESOLVED
                  </span>
                )}
              </div>
            </div>

            <p className="mt-6 text-sm md:text-base leading-7 text-body">
              {item.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-col sm:items-start gap-4 text-sm text-body">
              <div className="flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.8} className="text-muted" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} strokeWidth={1.8} className="text-muted" />
                <span>
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} strokeWidth={1.8} className="text-muted" />
                <p>Posted by:</p>
                <span>{user.username}</span>
              </div>
            </div>

            {hasCoords && (
              <div className="mt-8">
                <p className="mb-2 text-sm font-medium text-ink">
                  Location on map
                </p>
                <MapView
                  center={[item.latitude, item.longitude]}
                  zoom={15}
                  markers={[
                    {
                      lat: item.latitude,
                      lng: item.longitude,
                      title: item.location,
                    },
                  ]}
                  className="h-64 w-full overflow-hidden rounded-lg border border-edge z-0"
                />
              </div>
            )}
            <div>
              {isOwner ? (
                isResolved ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="w-full rounded-lg bg-emerald-50 px-5 py-3 text-center text-sm font-medium text-emerald-700">
                      Item resolved
                    </div>
                    <button
                      type="button"
                      onClick={handleUnresolveItem}
                      disabled={isUnresolving}
                      className="btn-secondary w-full"
                    >
                      {isUnresolving
                        ? "Reactivating..."
                        : "Mark as active"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResolveItem}
                    disabled={isResolving}
                    className="btn-primary mt-4 w-full"
                  >
                    {isResolving ? "Resolving..." : "Mark as resolved"}
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  disabled={isResolved}
                  className="btn-primary mt-4 w-full"
                >
                  {isResolved ? "Item already resolved" : "Contact Owner"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showContactModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="w-full max-w-lg card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5">
              <h2 className="font-display text-xl text-ink">
                Contact Owner
              </h2>
              <p className="mt-1 text-sm text-body">
                Send a message about this item.
              </p>
            </div>

            {/* Item preview */}
            <div className="flex gap-4 rounded-card border border-edge bg-soft-surface p-3">
              <img
                src={item.image_url}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="min-w-0">
                <h3 className="font-medium text-ink">{item.name}</h3>

                <p className="mt-1 line-clamp-2 text-xs text-body">
                  {item.description}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={13} />
                  {item.location}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="label"
              >
                Your message
              </label>

              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Hi, I think this might be my item..."
                className="field resize-none px-4 py-3"
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!message.trim() || isSending}
                onClick={handleSendMessage}
                className="btn-primary flex-1"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { MapPin, Clock, ArrowLeft } from "lucide-react";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const path = window.location.pathname;
  const type = path.startsWith("/lostit") ? "lost" : "found";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/${type}Items/${id}`,
        );
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-zinc-600 text-lg">Item not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full aspect-[16/9] object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900">
                {item.name}
              </h1>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  type === "lost"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {type === "lost" ? "LOST" : "FOUND"}
              </span>
            </div>

            <p className="mt-6 text-sm md:text-base leading-7 text-zinc-600">
              {item.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.8} />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} strokeWidth={1.8} />
                <span>
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;

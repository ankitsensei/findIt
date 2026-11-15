import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { MapPin, Clock, Search, Plus } from "lucide-react";
import MapView from "../components/MapView";
import { API_BASE_URL } from "../config";

const LostIt = () => {
  const [lostData, setLostData] = useState([]);
  const [lostDataLoaded, setLostDataLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem("token");

  const fetchLostData = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/lostItems?page=${page}&search=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to load items");
      setLostData(json.items ?? []);
      setTotalPages(json.totalPages ?? 0);
      setLostDataLoaded(true);
    } catch (error) {
      console.error(error);
      setLostData([]);
      setTotalPages(0);
      setLostDataLoaded(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLostData();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, page]);

  if (!lostDataLoaded) {
    return (
      <div className="min-h-screen bg-canvas pt-22 md:pt-26 pb-8 md:pb-12 px-4 sm:px-6 md:px-10 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-edge border-t-blue" />
      </div>
    );
  }

  const mapMarkers = lostData
    .filter(
      (item) =>
        item.latitude != null &&
        item.longitude != null &&
        Number.isFinite(Number(item.latitude)) &&
        Number.isFinite(Number(item.longitude)),
    )
    .map((item) => ({
      lat: Number(item.latitude),
      lng: Number(item.longitude),
      title: item.name,
      popupHtml: `<a href="/lostit/${item.id}" style="font-weight:600;color:#0c0a09;text-decoration:none">${item.name}</a><br/><span style="font-size:12px;color:#78716c">${item.location}</span>`,
    }));

  return (
    <div className="min-h-screen bg-canvas pt-22 md:pt-26 pb-8 md:pb-12 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-[1024px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="tag">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Lost items
            </div>
            <h1 className="type-heading mt-3">All lost items</h1>
            <p className="mt-2 text-sm text-secondary">
              Browse recently reported lost items and help reunite them.
            </p>
          </div>

          <NavLink
            to="/createlostitem"
            className="btn-primary w-fit cursor-pointer"
          >
            <Plus size={16} strokeWidth={2} />
            Post what you lost
          </NavLink>
        </div>

        <div className="relative mt-8 max-w-md">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or description..."
            className="field pl-11 pr-4"
          />
        </div>

        {mapMarkers.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-ink">
              View on map
            </p>
            <MapView
              markers={mapMarkers}
              className="h-80 w-full overflow-hidden rounded-lg border border-edge z-0"
            />
          </div>
        )}

        {lostData.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-card border border-dashed border-pale-ink bg-card/60 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-soft-surface text-muted">
              <Search size={20} strokeWidth={1.8} />
            </div>
            <h2 className="mt-4 font-display text-lg text-ink">
              No lost items found
            </h2>
            <p className="mt-1 text-sm text-body">
              {search
                ? "Try a different search or clear your query."
                : "Be the first to report a lost item."}
            </p>
            {!search && (
              <NavLink
                to="/createlostitem"
                className="btn-primary mt-5"
              >
                <Plus size={14} strokeWidth={2} />
                Post what you lost
              </NavLink>
            )}
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {lostData.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-card border border-edge bg-card shadow-card transition duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-soft-surface">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-red-600 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Lost
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3 md:p-4">
                    <h3 className="text-sm font-medium text-ink md:text-[15px]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs md:text-sm md:leading-6 text-body">
                      {item.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-edge pt-3 md:pt-4 text-[0.65rem] md:text-xs text-muted">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <MapPin
                          size={12}
                          strokeWidth={1.8}
                          className="shrink-0 md:hidden"
                        />
                        <MapPin
                          size={13}
                          strokeWidth={1.8}
                          className="hidden shrink-0 md:block"
                        />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <Clock
                          size={12}
                          strokeWidth={1.8}
                          className="shrink-0 md:hidden"
                        />
                        <Clock
                          size={13}
                          strokeWidth={1.8}
                          className="hidden shrink-0 md:block"
                        />
                        <span className="whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>

                    <NavLink
                      to={`/lostit/${item.id}`}
                      className="mt-3 block w-full rounded-lg border border-edge py-1.5 md:py-2 text-center text-xs md:text-sm font-medium text-secondary transition hover:border-blue hover:text-blue"
                    >
                      View details
                    </NavLink>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border border-edge bg-card px-4 py-2.5 text-sm font-medium text-body transition hover:border-blue hover:text-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-lg border border-edge bg-card px-4 py-2.5 text-sm font-medium text-muted">
                  Page{" "}
                  <span className="font-medium text-ink">{page}</span> of{" "}
                  <span className="font-medium text-ink">
                    {totalPages}
                  </span>
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-edge bg-card px-4 py-2.5 text-sm font-medium text-body transition hover:border-blue hover:text-blue disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LostIt;

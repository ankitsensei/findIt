import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { MapPin, Clock, Search, Plus } from "lucide-react";

const FoundIt = () => {
  const [foundData, setFoundData] = useState([]);
  const [foundDataLoaded, setFoundDataLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchFoundData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/foundItems?page=${page}&search=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to load items");
      setFoundData(json.items ?? []);
      setTotalPages(json.totalPages ?? 0);
      setFoundDataLoaded(true);
    } catch (error) {
      console.error(error);
      setFoundData([]);
      setTotalPages(0);
      setFoundDataLoaded(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFoundData();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, page]);

  if (!foundDataLoaded) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Found items
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
              Items I Found
            </h1>
            <p className="mt-2 text-sm md:text-base text-zinc-500">
              Browse recently reported found items and claim what's yours.
            </p>
          </div>

          <NavLink
            to="/createfounditem"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.98] cursor-pointer"
          >
            <Plus size={16} strokeWidth={2} />
            Post what you found
          </NavLink>
        </div>

        <div className="relative mt-8 max-w-md">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or description..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-11 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        {foundData.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
              <Search size={20} strokeWidth={1.8} />
            </div>
            <h2 className="mt-4 text-base font-semibold text-zinc-900">
              No found items found
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {search
                ? "Try a different search or clear your query."
                : "Be the first to report a found item."}
            </p>
            {!search && (
              <NavLink
                to="/createfounditem"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                <Plus size={14} strokeWidth={2} />
                Post what you found
              </NavLink>
            )}
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
              {foundData.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-700 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Found
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold tracking-tight text-zinc-900">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs md:text-sm md:leading-6 text-zinc-500">
                      {item.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-zinc-100 pt-3 md:pt-4 text-[0.65rem] md:text-xs text-zinc-500">
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
                      to={`/foundit/${item.id}`}
                      className="mt-3 block w-full rounded-lg border border-zinc-200 py-1.5 md:py-2 text-center text-xs md:text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
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
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-500">
                  Page{" "}
                  <span className="font-semibold text-zinc-900">{page}</span> of{" "}
                  <span className="font-semibold text-zinc-900">
                    {totalPages}
                  </span>
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
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

export default FoundIt;

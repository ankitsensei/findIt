import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { MapPin, Clock } from "lucide-react";

const FoundIt = () => {
  const [foundData, setFoundData] = useState([]);
  const [foundDataLoaded, setFoundDataLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpPage, setJumpPage] = useState("");
  const userId = localStorage.getItem("userId");

  const fetchFoundData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/foundItems?page=${page}&search=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: { userId: userId },
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

  if (!foundDataLoaded)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading found items...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-12 text-center flex flex-col items-center  ">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900">
            Found Items
          </h1>
          <p className="mt-2 text-xs md:text-sm text-zinc-500">
            Recently reported found items
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-lg border w-1/2 mt-2"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search items..."
              className="w-full px-3 py-2 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-lg h-full bg-amber-200"
            >
              Search
            </button>
          </form>
        </div>

        {foundData.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white py-16 text-center text-sm md:text-base text-zinc-500">
            No found items found.
          </div>
        ) : (
          <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {foundData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="aspect-[4/3] w-full object-cover"
                />

                <div className="flex flex-col flex-1 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm md:text-base lg:text-lg font-medium text-zinc-900">
                      {item.name}
                    </h2>
                    <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 md:px-2.5 md:py-1 text-[0.6rem] md:text-xs font-medium text-zinc-600">
                      FOUND
                    </span>
                  </div>

                  <p className="line-clamp-2 text-xs md:text-sm leading-5 md:leading-6 text-zinc-600 mt-2 md:mt-4">
                    {item.description}
                  </p>

                  <div className="border-t border-zinc-100 pt-3 md:pt-4 mt-3 md:mt-4 text-xs md:text-sm text-zinc-500 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                      <MapPin
                        size={14}
                        strokeWidth={1.8}
                        className="shrink-0"
                      />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Clock size={14} strokeWidth={1.8} className="shrink-0" />
                      <span className="whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <NavLink
                    to={`/foundit/${item.id}`}
                    className="mt-2 block w-full rounded-lg border border-zinc-200 py-2 text-xs md:text-sm font-medium text-zinc-700 text-center transition hover:bg-zinc-100"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {foundData.length ? (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
            Jump to
            <input
              type="number"
              placeholder="1"
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              min={1}
              max={totalPages}
              className="px-2 w-20 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const pageNum = Number(jumpPage);
                  if (pageNum >= 1 && pageNum <= totalPages) {
                    setPage(pageNum);
                  }
                  setJumpPage("");
                }
              }}
            />
            <button
              onClick={() => {
                const pageNum = Number(jumpPage);

                if (pageNum >= 1 && pageNum <= totalPages) {
                  setPage(pageNum);
                }

                setJumpPage("");
              }}
            >
              Go
            </button>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default FoundIt;

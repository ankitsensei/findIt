import { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";

const FoundIt = () => {
  const [foundData, setfoundData] = useState([]);
  const [foundDataLoaded, setfoundDataLoaded] = useState(false);

  const fetchfoundData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/foundItems`);
      const json = await res.json();
      setfoundData(json);
      setfoundDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchfoundData();
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!foundDataLoaded)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading found items...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 py-8 md:py-12 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900">
            Found Items
          </h1>
          <p className="mt-2 text-xs md:text-sm text-zinc-500">
            Recently reported found items
          </p>
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
                      FOUNDED
                    </span>
                  </div>

                  <p className="line-clamp-2 text-xs md:text-sm leading-5 md:leading-6 text-zinc-600 mt-2 md:mt-4">
                    {item.description}
                  </p>

                  <div className="border-t border-zinc-100 pt-3 md:pt-4 mt-3 md:mt-4 text-xs md:text-sm text-zinc-500 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                      <MapPin size={14} strokeWidth={1.8} className="shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Clock size={14} strokeWidth={1.8} className="shrink-0" />
                      <span className="whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button className="mt-auto w-full rounded-lg border border-zinc-200 py-2 text-xs md:text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundIt;

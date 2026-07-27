import { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";

const LostIt = () => {
  const [lostData, setLostData] = useState([]);
  const [lostDataLoaded, setLostDataLoaded] = useState(false);

  const fetchLostData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/lostItems`);
      const json = await res.json();
      setLostData(json);
      setLostDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLostData();
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  console.log(lostData);

  if (!lostDataLoaded)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading lost items...</p>
      </div>
    );
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold text-zinc-900">Lost Items</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Recently reported lost items
          </p>
        </div>

        {lostData.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white py-16 text-center text-zinc-500">
            No lost items found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lostData.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-92 w-full object-cover"
                />

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-zinc-900">
                      {item.name}
                    </h2>

                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      LOST
                    </span>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-zinc-600">
                    {item.description}
                  </p>

                  <div className="space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} strokeWidth={1.8} />
                      <span>{item.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} strokeWidth={1.8} />
                      <span>
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
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

export default LostIt;

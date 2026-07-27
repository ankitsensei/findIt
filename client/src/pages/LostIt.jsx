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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Lost Items
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Browse recently reported lost items.
        </p>

        {lostData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No lost items found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lostData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-200"
              >
                <img src={item.image_url} alt="" />
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>

                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                    LOST
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Description</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span>
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
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

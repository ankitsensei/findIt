import { useState, useEffect } from "react";

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
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  return <div>LostIt</div>;
};

export default LostIt;

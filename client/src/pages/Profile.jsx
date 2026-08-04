import { useState, useEffect } from "react";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [useData, setUserData] = useState([]);
  const handleUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // console.log(user);
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleUserProfile();
    console.log(useData);
  }, []);
  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      Profile
    </div>
  );
};

export default Profile;

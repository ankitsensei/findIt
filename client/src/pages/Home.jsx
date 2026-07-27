import React from "react";
import { NavLink } from "react-router";
const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <h2>So, you lost something or found someone's thing?</h2>
      <div className="flex gap-4">
        <NavLink to="/lostit" className="">
          <button className="bg-zinc-700 text-white w-40 py-10 rounded-md outline-none">
            Lost it
          </button>
        </NavLink>
        <NavLink to="/foundit" className="">
          <button className="bg-zinc-700 text-white w-40 py-10 rounded-md outline-none">
            Found it
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { NavLink } from "react-router";
import hero from "../assets/hero.jpeg";

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center flex flex-col items-center gap-8">
        <img src={hero} alt="findIt" className="w-64 h-auto" />

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Lost something? Found something?
          </h1>
          <p className="text-zinc-400 text-lg">
            Help connect lost items with their owners. Report what you lost or
            what you found — and we'll try to match them.
          </p>
        </div>

        <div className="flex gap-5">
          <NavLink to="/lostit">
            <button className="bg-white text-zinc-900 font-semibold w-44 py-4 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer">
              I lost something
            </button>
          </NavLink>
          <NavLink to="/foundit">
            <button className="bg-zinc-700 text-white font-semibold w-44 py-4 rounded-lg hover:bg-zinc-600 transition-colors cursor-pointer">
              I found something
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;

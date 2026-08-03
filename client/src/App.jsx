import React from "react";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="w-full h-full">
      <Toaster />
      <Home />
    </div>
  );
};

export default App;

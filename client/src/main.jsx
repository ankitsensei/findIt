import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import LostIt from "./pages/LostIt.jsx";
import FoundIt from "./pages/FoundIt.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lostit" element={<LostIt />} />
        <Route path="/foundit" element={<FoundIt />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

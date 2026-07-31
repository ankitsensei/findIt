import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import LostIt from "./pages/LostIt.jsx";
import FoundIt from "./pages/FoundIt.jsx";
import ViewDetails from "./components/ViewDetails.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lostit" element={<LostIt />} />
        <Route path="/lostit/:id" element={<ViewDetails />} />
        <Route path="/foundit" element={<FoundIt />} />
        <Route path="/foundit/:id" element={<ViewDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

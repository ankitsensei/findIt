import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

import "./index.css";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import LostIt from "./pages/LostIt.jsx";
import FoundIt from "./pages/FoundIt.jsx";
import MyLosts from "./pages/MyLosts.jsx";
import MyFounds from "./pages/MyFounds.jsx";
import ViewDetails from "./components/ViewDetails.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile.jsx";
import CreateLostItem from "./pages/CreateLostItem.jsx";
import CreateFoundItem from "./pages/CreateFoundItem.jsx";
import OAuthSuccess from "./OAuthSuccess.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lostit" element={<LostIt />} />
        <Route path="/lostit/:id" element={<ViewDetails />} />
        <Route path="/mylosts" element={<MyLosts />} />
        <Route path="/myfounds" element={<MyFounds />} />
        <Route path="/foundit" element={<FoundIt />} />
        <Route path="/foundit/:id" element={<ViewDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createlostitem" element={<CreateLostItem />} />
        <Route path="/createfounditem" element={<CreateFoundItem />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

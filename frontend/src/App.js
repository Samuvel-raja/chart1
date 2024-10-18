import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Emission from "./pages/Emission";
import "./App.css";
import Water from "./pages/Water";
import MainPage from "./pages/MainPage";
import Wastes from "./pages/Wastes";
import Navbar from "./pages/Navbar";
import { useState } from "react";

import UpdateWastes from "./pages/UpdateWastes";

function App() {
  const [navopt, setnavopt] = useState("uploads");
  return (
    <>
      <Navbar setnavopt={setnavopt} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home navopt={navopt} />} />
        <Route path="/emission" element={<Emission />} />
        <Route path="/water" element={<Water />} />
        <Route path="/wastes" element={<Wastes />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/updateWastes/:id" element={<UpdateWastes />} />
      </Routes>
    </>
  );
}

export default App;

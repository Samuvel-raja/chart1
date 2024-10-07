import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Emission from "./pages/Emission";
import './App.css'
import Water from "./pages/Water";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path='/emission' element={<Emission/>}/>
        <Route path='/water' element={<Water/>}/>
        <Route path='/main' element={<MainPage/>}/>
      </Routes>
    </>
  );
}

export default App;

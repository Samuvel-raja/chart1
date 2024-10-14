import React from "react";
import Uploads from "./Uploads";
import MainPage from "./MainPage";



const Home = ({ navopt }) => {
 
  return (
    <>
      <div>
        {navopt === "uploads" && <Uploads />}
        {navopt === "dashboard" && <MainPage />}
      </div>
    </>
  );
};

export default Home;

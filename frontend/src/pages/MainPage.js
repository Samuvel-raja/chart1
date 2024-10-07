import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Emission from "./Emission";
import Water from "./Water";

const MainPage = () => {
  const [nav, setnav] = useState("Emissions");
  const handleChange = (e, val) => {
    setnav(val);
  };
  return (
    <>
      <div>
        <Box>
          <Tabs value={nav} onChange={handleChange}>
            <Tab label="Emissions" value="Emissions" />
            <Tab label="Water" value="Water" />
            <Tab label="Wastes" value="Wastes" />
          </Tabs>
        </Box>
      </div>
      {nav === "Emissions" && <Emission />}
      {nav === "Water" && <Water />}
    </>
  );
};

export default MainPage;

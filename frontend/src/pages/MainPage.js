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
          <Tabs value={nav} onChange={handleChange}
          TabIndicatorProps={{sx:{display:"none"}}}
          sx={{
            '& button':{margin:1},
            '& button:hover':{backgroundColor:'rgba(225, 221, 251, 0.3)',borderRadius:3},
            '& button.Mui-selected':{color:'rgb(52, 25, 218)',backgroundColor:'rgba(225, 221, 251, 0.3)',borderRadius:3}
          }}>
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

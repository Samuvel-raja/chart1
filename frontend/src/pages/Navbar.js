import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "../styles/Navbar.css"; // Ensure you import your CSS file

const Navbar = ({ setnavopt, navopt }) => {
  const[val,setval]=useState();
  const handleChange = (event, newValue) => {
    setnavopt(newValue);
    setval(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Typography variant="subtitle1">draftECG</Typography>
      <Tabs
        value={val}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            display:"none"
          },
        }}
        sx={{
          "& button": { margin: 1 },
          "& button:hover": {
            backgroundColor: "rgba(225, 221, 251, 0.3)",
            borderRadius: 3,
          },
          "& button.Mui-selected": {
            color: "rgb(52, 25, 218)",
            backgroundColor: "rgba(225, 221, 251, 0.3)",
            borderRadius: 3,
          },
        }}
      >
        <Tab label="Uploads" value="uploads" />
        <Tab label="Dashboard" value="dashboard" />
      </Tabs>
    </Box>
  );
};

export default Navbar;

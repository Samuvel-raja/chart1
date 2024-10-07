import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Scope1 from "./Scope1";
import Scope2 from "./Scope2";
import Scope3 from "./Scope3";
import BarChart from "./LeftScopeBar";
import LineChart from "./RightScopeBar";
import "../styles/ScopeBar.css";

const ScopeBar = ({ eData, fyears }) => {
  const scope1Data = eData.map((val) =>
    val.filter((val) => val.scope.trim() === "scope1")
  );
  const scope2Data = eData.map((val) =>
    val.filter((val) => val.scope.trim() === "scope2")
  );
  const scope3Data = eData.map((val) =>
    val.filter((val) => val.scope.trim() === "scope3")
  );

  const [scope, setScope] = useState("scope1");

  const handleChange = (event, newValue) => {
    setScope(newValue);
  };

  return (
    <>
      <div className="main-scope-bar">
        <div className="header-scope-bar">
          <div className="scope-head-1">
            <BarChart eData={eData} fyears={fyears} className="chart1" />
          </div>
          <div className="scope-head-2">
            <LineChart eData={eData} fyears={fyears} className="chart2" />
          </div>
        </div>
        <div className="bottom-scope-bar">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={scope} onChange={handleChange}>
              <Tab label="Scope 1" value="scope1" />
              <Tab label="Scope 2" value="scope2" />
              <Tab label="Scope 3" value="scope3" />
            </Tabs>
          </Box>

          <Box className="scope-main-2">
            {scope === "scope1" && (
              <Scope1 scope1Data={scope1Data} fyears={fyears} />
            )}
            {scope === "scope2" && (
              <Scope2 scope2Data={scope2Data} fyears={fyears} />
            )}
            {scope === "scope3" && (
              <Scope3 scope3Data={scope3Data} fyears={fyears} />
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default ScopeBar;

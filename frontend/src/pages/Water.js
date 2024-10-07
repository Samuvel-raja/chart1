import React, { useEffect, useState } from "react";
import { getAllWatersApi } from "../apicalls/waterApi";

import WithDrawnChart from "./WithdrawnChart";

const Water = () => {
  const [wdata, setwdata] = useState([]);
  useEffect(() => {
    try {
      const getWaterData = async () => {
        const data = await getAllWatersApi();
        setwdata(data.data.getallWaters);
      };
      getWaterData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // useEffect(() => {
  //   console.log(wdata);
  // }, [wdata]);
  return (
    <>
      <WithDrawnChart wdata={wdata} />
    </>
  );
};

export default Water;

import React, { useEffect, useState } from "react";
import { getAllWatersApi } from "../apicalls/waterApi";

import WithDrawnChart from "./WithdrawnChart";
import DisChargedChart from "./DischargedChart";
import ReCycledChart from "./ReCycledChart";
import ConsumedChart from "./ConsumedChart";
import WithdrawnLineChart from "./WithdrawnLinearChart";
import DischargedLineChart from "./DischargedLinearChart";
import ReCycledLineChart from "./ReCycledLinearChart";
import ConsumedLineChart from "./ConsumedLinearChart";

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

  return (
    <>
      <div className="main-water-cont">
        <div className="water-cont-1">
          <div className="water-inside-cont-1">
            <WithDrawnChart wdata={wdata} />
          </div>
          <div className="water-inside-cont-2">
            <WithdrawnLineChart wdata={wdata} />
          </div>
        </div>
        <div className="water-cont-2">
          <div className="water-inside-cont-1">
            <DisChargedChart wdata={wdata} />
          </div>
          <div className="water-inside-cont-2">
            <DischargedLineChart wdata={wdata} />
          </div>
        </div>
        <div className="water-cont-3">
          <div className="water-inside-cont-1">
            <ReCycledChart wdata={wdata} />
          </div>
          <div className="water-inside-cont-2">
            <ReCycledLineChart wdata={wdata} />
          </div>
        </div>
        <div className="water-cont-4">
          <div className="water-inside-cont-1">
            <ConsumedChart wdata={wdata} />
          </div>
          <div className="water-inside-cont-2">
            <ConsumedLineChart wdata={wdata} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Water;

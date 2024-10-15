import React, { useEffect, useState } from "react";
import { getAllWatersApi } from "../apicalls/waterApi";

import Select from "react-select";
import WithDrawnChart from "./WithdrawnChart";
import DisChargedChart from "./DischargedChart";
import ReCycledChart from "./ReCycledChart";
import ConsumedChart from "./ConsumedChart";
import WithdrawnLineChart from "./WithdrawnLinearChart";
import ReCycledLineChart from "./ReCycledLinearChart";
import ConsumedLineChart from "./ConsumedLinearChart";
import DischargedLinearChart from "./DischargedLinearChart";

const Water = () => {
  const [wdata, setwdata] = useState([]);
  const [SelectedOption, setSelectedOption] = useState();
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


  const handleChange = (e) => {
    setSelectedOption(e);
  };
  const fyears = new Set();
  wdata.forEach((item) => {

    if (item.fyear) {
 
      
      fyears.add(item.fyear.fiscalyear);
    }
  });


  // console.log(wdata);
  

  const options = Array.from(fyears).map((val) => ({
    value: val,
    label: val,
  }));

  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '25%',     
      height: '5%',     
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '5%',      
      display: 'flex',
      alignItems: 'center', 
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '5%', 
    }),
    menu: (provided) => ({
      ...provided,
      width: '25%', 
    })
  };

  
  return (
    <>
        <div className="scope-nav">
        <Select
          value={SelectedOption}
          onChange={handleChange}
          options={options} 
          isMulti
          styles={customStyles}
        />
      </div>
      <div className="main-water-cont">
        <div className="water-cont-1">
          <div className="water-inside-cont-1">
            <WithDrawnChart wdata={wdata} fyear={SelectedOption}/>
          </div>
          <div className="water-inside-cont-2">
            <WithdrawnLineChart wdata={wdata} fyear={SelectedOption}/>
          </div>
        </div>
        <div className="water-cont-2">
          <div className="water-inside-cont-1">
            <DisChargedChart wdata={wdata} fyear={SelectedOption}/>
          </div>
          <div className="water-inside-cont-2">
            <DischargedLinearChart wdata={wdata} fyear={SelectedOption}/>
          </div>
        </div>
        <div className="water-cont-3">
          <div className="water-inside-cont-1">
            <ReCycledChart wdata={wdata} fyear={SelectedOption}/>
          </div>
          <div className="water-inside-cont-2">
            <ReCycledLineChart wdata={wdata} fyear={SelectedOption}/>
          </div>
        </div>
        <div className="water-cont-4">
          <div className="water-inside-cont-1">
            <ConsumedChart wdata={wdata} fyear={SelectedOption}/>
          </div>
          <div className="water-inside-cont-2">
            <ConsumedLineChart wdata={wdata} fyear={SelectedOption}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Water;

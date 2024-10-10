import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllWastesApi } from "../apicalls/wastesApi";

import DischargedLinearChart from "./DischargedLinearChart";
import ReCycledLinearChart from "./ReCycledLinearChart";

import GeneratedChart from "./GeneratedChart";
import DisposedChart from "./DisposedChart";
import RecoveredChart from "./RecoveredChart";
import GeneratedLinearChart from "./GeneratedLinearChart";
import DisposedLinearChart from "./DisposedLinearChart";
import RecoveredLinearChart from "./RecoveredLinearChart";

const Wastes = () => {
  const [wtdata, setwtdata] = useState();
  const [SelectedOption, setSelectedOption] = useState();
  useEffect(() => {
    try {
      const getWastesData = async () => {
        const data = await getAllWastesApi();
        setwtdata(data.data);
      };
      getWastesData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (e) => {
    setSelectedOption(e);
  };

  const fyears = new Set();

  if (Array.isArray(wtdata)) {
    wtdata.forEach((item) => {
      if (item.fyear) {
        fyears.add(item.fyear.fiscalyear);
      }
    });
  } else {
    console.error("wtdata is not an array:", wtdata);
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "25%",
      height: "5%",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "5%",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "5%",
    }),
    menu: (provided) => ({
      ...provided,
      width: "25%",
    }),
  };

  const options = Array.from(fyears).map((val) => ({
    value: val,
    label: val,
  }));
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
            <GeneratedChart wdata={wtdata} fyear={SelectedOption} />
          </div>
          <div className="water-inside-cont-2">
            <GeneratedLinearChart wdata={wtdata} fyear={SelectedOption} />
          </div>
        </div>
        <div className="water-cont-2">
          <div className="water-inside-cont-1">
            <DisposedChart wdata={wtdata} fyear={SelectedOption} />
          </div>
          <div className="water-inside-cont-2">
            <DisposedLinearChart wdata={wtdata} fyear={SelectedOption} />
          </div>
        </div>
        <div className="water-cont-3">
          <div className="water-inside-cont-1">
            <RecoveredChart wdata={wtdata} fyear={SelectedOption} />
          </div>
          <div className="water-inside-cont-2">
            <RecoveredLinearChart wdata={wtdata} fyear={SelectedOption} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wastes;

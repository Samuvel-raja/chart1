import React, { useEffect, useState } from "react";
import ScopeBar from "./BottomScopeBar";
import Select from "react-select";
import { getEmissionApi } from "../apicalls/emissionApi";

const Emission = () => {
  const [edata, setedata] = useState([]);
  useEffect(() => {
    const getAllEmissions = async () => {
      try {
        const emissionData = await getEmissionApi();
        setedata([...edata, emissionData.data]);
      } catch (err) {
        console.log(err);
      }
    };
    getAllEmissions();
  }, []);

  const [SelectedOption, setSelectedOption] = useState();
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  const fyears = new Set();
  edata.map((item) => item.map((val) => fyears.add(val.fyear.fiscalyear)));

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

      <ScopeBar eData={edata} fyears={SelectedOption} />
    </>
  );
};

export default Emission;

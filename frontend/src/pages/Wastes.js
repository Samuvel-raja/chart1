import React, { useState } from 'react';
import Select from "react-select";

const Wastes = () => {
    const[wstdata,setwstdata]=useState();
    const [SelectedOption, setSelectedOption] = useState();
    const handleChange = (e) => {
      setSelectedOption(e);
    };
    const fyears = new Set();
    // wdata.forEach((item) => {
    //   if (item.fyear) {
    //     fyears.add(item.fyear.fiscalyear);
    //   }
    // });
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
  
    const options = Array.from(fyears).map((val) => ({
      value: val,
      label: val,
    }));
  return (
    <div className="scope-nav">
    <Select
      value={SelectedOption}
      onChange={handleChange}
      options={options} 
      isMulti
      styles={customStyles}
    />
  </div>
  )
}

export default Wastes

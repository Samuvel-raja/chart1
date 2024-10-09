import React, { useState } from "react";
import Papa from "papaparse";
import { postEmissionApi } from "../apicalls/emissionApi";
import { postWaterApi } from "../apicalls/waterApi";
import Select from "react-select";



const Home = () => {
  const [data, setData] = useState([]);
  const[wdata,setwdata]=useState([]);
  const [SelectedOption, setSelectedOption] = useState();
 


  const handleChange1 = (e) => {
     const file = e.target.files[0];
     if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };
  const handleSubmit1=async(e)=>
  {
    e.preventDefault();
    try {
      await postEmissionApi(data);
    } catch (error) {
       console.log(error);
       
    }
    console.log(data); 
  }

  const handleChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
     Papa.parse(file, {
       header: true,
       skipEmptyLines: true,
       complete: (results) => {
         setwdata(results.data);
       },
       error: (error) => {
         console.error("Error parsing CSV:", error);
       },
     });
   }
 };


 const handleSubmit2=async(e)=>
 {
    e.preventDefault();
    try {
      await postWaterApi({wdata,SelectedOption});
    } catch (err) {
       console.log(err);
       
    }
    console.log(wdata);
    
 }


 const handleChange = (val) => {
   setSelectedOption(val);
 };
 const options = [
  { label: "F 22-23", value: "F 22-23" },
  { label: "F 23-24", value: "F 23-24" },
  { label: "F 24-25", value: "F 24-25" },
];
 

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
         <Select
          value={SelectedOption}
          onChange={handleChange}
          options={options} 
          styles={customStyles}
        />
    
      <input type="file" accept=".csv" onChange={handleChange1} />
      <button onClick={handleSubmit1}>Click</button>
      <input type="file" accept=".csv" onChange={handleChange2} />
      <button onClick={handleSubmit2}>Click</button>
    </>
  );
};

export default Home;

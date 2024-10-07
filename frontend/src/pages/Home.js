import React, { useState } from "react";
import Papa from "papaparse";
import { postEmissionApi } from "../apicalls/emissionApi";
import { postWaterApi } from "../apicalls/waterApi";


const Home = () => {
  const [data, setData] = useState([]);
  const[wdata,setwdata]=useState([]);
 
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
      await postWaterApi(wdata);
    } catch (err) {
       console.log(err);
       
    }
    console.log(wdata);
    
 }
  return (
    <>
      <input type="file" accept=".csv" onChange={handleChange1} />
      <button onClick={handleSubmit1}>Click</button>
      <input type="file" accept=".csv" onChange={handleChange2} />
      <button onClick={handleSubmit2}>Click</button>
    </>
  );
};

export default Home;

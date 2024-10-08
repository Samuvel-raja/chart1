import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ConsumedChart = ({ wdata, fyear }) => {

  
  const [elabels, setElables] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (!fyear || fyear.length === 0) {
      console.log("No fiscal years selected, clearing chart");
      setElables([]);
      setDatasets([]);
      return;
    }

    if (!wdata || wdata.length === 0) {
      console.log("No data found");
      setElables([]);
      setDatasets([]);
      return;
    }

    const selectedfyear = fyear.map((f) => f.value); 

    const filteredData = wdata.filter(
      (item) =>
        item.status === "consumed" && 
        selectedfyear.includes(item.fyear.fiscalyear) 
    );

    
    if (filteredData.length === 0) {
      console.log("No matching consumed data for selected fiscal years");
      setElables([]);
      setDatasets([]);
      return;
    }

    
    const labelSet = new Set();
    const unitsMap = {};

  
    selectedfyear.forEach((year) => {
      unitsMap[year] = {};
    });

    filteredData.forEach((item) => {
      const { type, units, fyear } = item; 
      labelSet.add(type); 


      if (!unitsMap[fyear.fiscalyear][type]) {
        unitsMap[fyear.fiscalyear][type] = 0;
      }
      unitsMap[fyear.fiscalyear][type] += units; 
    });

    const labelsArray = Array.from(labelSet); 

  
    const tempDatasets = selectedfyear.map((year) => {
      return {
        label: year,
        data: labelsArray.map((label) => unitsMap[year][label] || 0), 
        backgroundColor: `rgba(85, 61, 233, ${0.5 + Math.random() * 0.5})`, 
        borderColor: `rgba(85, 61, 233, 1)`,
      };
    });

    setElables(labelsArray); 
    setDatasets(tempDatasets); 
  }, [wdata, fyear]);

  const data = {
    labels: elabels,
    datasets: datasets,
  };


  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true, 
        position: "top",
      },
      datalabels:
      {
        display:false
      },
      title: {
        display: true,
        text: "Consumed Units by Fiscal Year",
        font: {
          size: 15,
          weight: "lighter",
        },
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} height={300} width={500} />
    </div>
  );
};

export default ConsumedChart;

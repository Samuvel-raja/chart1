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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WithDrawnChart = ({ wdata }) => {
  const [elabels, setElables] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (!wdata || wdata.length === 0) {
      console.log("No data found");
      setElables([]);
      setDatasets([]);
      return;
    }

    const labelSet = new Set();
    const unitsMap = {};

    wdata.forEach((item) => {
      if (typeof item === 'object') {
        const { type, units } = item;
        labelSet.add(type);

     
        if (!unitsMap[type]) {
          unitsMap[type] = 0;
        }

        unitsMap[type] += units;
      } else {
        console.warn("Invalid data format:", item);
      }
    });


    const labelsArray = Array.from(labelSet);


    const tempDatasets = [{
      label: "Water Units",
      data: labelsArray.map((label) => unitsMap[label] || 0), 
      backgroundColor: labelsArray.map(
        () => `rgb(85, 61, 233)`
      ),
      borderColor: labelsArray.map(        () => `rgb(85, 61, 233)
`
      ),
    }];

    setElables(labelsArray); 
    setDatasets(tempDatasets); 
  }, [wdata]);

  const data = {
    labels: elabels, 
    datasets: datasets, 
  };

  const options = {
    indexAxis: "y", 
    scales: {
      x: {
        beginAtZero: true,
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
      title: {
        display: true,
        text: "Water Units",
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
      <Bar data={data} options={options} height={100} width={500} />
    </div>
  );
};

export default WithDrawnChart;

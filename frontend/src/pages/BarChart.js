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

const HorizontalBarChart = ({ edata, fyears }) => {
  const [elabels, setElables] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const labelSet = new Set(); 
    const tempDatasets = []; 

    if (!fyears || fyears.length === 0) {
      console.log("No fiscal years selected. Clearing the chart.");
      setElables([]); 
      setDatasets([]);
      return; 
    }

    if (!edata || edata.length === 0) {
      console.log("No emission data found");
      setElables([]); 
      setDatasets([]); 
      return;
    }

    fyears.forEach((fyear) => {
      const emissions = []; 
      const flabel = typeof fyear === "object" ? fyear.label : fyear;

      edata.forEach((val) => {
        if (Array.isArray(val)) {
          val.forEach((item) => {
            if (item.fyear === flabel) {
              labelSet.add(item.type); 
              emissions.push(item.emissions); 
            }
          });
        } else {
          console.warn("Invalid data format:", val);
        }
      });

      if (emissions.length > 0) {
        tempDatasets.push({
          label: flabel,
          data: emissions,
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`, 
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`, 
        });
      }
    });

 
    if (tempDatasets.length === 0) {
      console.log("No datasets available. Clearing the chart.");
      setElables([]); 
      setDatasets([]); 
    } else {
      setElables(Array.from(labelSet)); 
      setDatasets(tempDatasets); 
    }
  }, [edata, fyears]); 
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
        text: "Emissions (tCo2e)",
        font: {
           size: "15px",
           weight: "lighter",
        },
        position: "bottom",
     }     
    },
  };

  return (
    <div>
      <Bar data={data} options={options} height={100} width={500} />
    </div>
  );
};

export default HorizontalBarChart;
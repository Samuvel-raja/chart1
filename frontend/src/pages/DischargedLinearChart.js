import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import '../styles/waterChart.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const DischargedLineChart = ({ wdata }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (!wdata || wdata.length === 0) {
      console.log("No data found");
      setLabels([]);
      setDatasets([]);
      return;
    }


    const convertToDate = (dateString) => {
      const [day, month, year] = dateString.split("-");
      return new Date(`${year}-${month}-${day}`);
    };

 
    const monthUnitsMap = {};

    const filteredData = wdata.filter(item => 
      typeof item === "object" &&
      item.start_date &&
      item.end_date &&
      item.units &&
      item.status === "discharged"
    );

    filteredData.forEach((item) => {
      const startDate = convertToDate(item.start_date);
      const endDate = convertToDate(item.end_date);

 
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const monthKey = currentDate.toLocaleString("default", { month: "long" });

     
        if (!monthUnitsMap[monthKey]) {
          monthUnitsMap[monthKey] = 0;
        }

 
        monthUnitsMap[monthKey] += item.units;

  
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    });


    const labelsArray = Object.keys(monthUnitsMap).sort((a, b) => 
      new Date(Date.parse(a + " 1, 2020")) - new Date(Date.parse(b + " 1, 2020"))
    ); 
    const dataValues = labelsArray.map((label) => monthUnitsMap[label]);


    const tempDatasets = [
      {
        label: "Withdrawn Units",
        data: dataValues,
        fill: false,
        backgroundColor: "rgb(85, 61, 233)",
        borderColor: "rgb(85, 61, 233)",
      },
    ];

    setLabels(labelsArray);
    setDatasets(tempDatasets);
  }, [wdata]);

  const data = {
    labels: labels, 
    datasets: datasets, 
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Discharged Units",
        },
      },
    },
  
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      datalabels: {
        display: false, 
      },
      title: {
        display: false,
        text: "Withdrawn Units per Month",
        font: {
          size: 15,
          weight: "lighter",
        },
      },
    },
  };
  

  return (
    <div className="water-bar-chart">
      <Line data={data} options={options} height={500} width={900} />
    </div>
  );
};

export default DischargedLineChart;

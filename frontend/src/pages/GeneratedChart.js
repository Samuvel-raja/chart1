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

const GeneratedChart = ({ wdata, fyear }) => {
  const [elabels, setElables] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (!fyear || fyear.length === 0) {
      setElables([]);
      setDatasets([]);
      return;
    }

    if (!wdata || wdata.length === 0) {
      setElables([]);
      setDatasets([]);
      return;
    }

    const selectedfyear = fyear.map((f) => f.value); // selected fiscal years

    const filteredData = wdata.filter(
      (item) =>
        item.type === "generated" &&
        selectedfyear.includes(item.fyear.fiscalyear)
    );

    if (filteredData.length === 0) {
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
      const { category, quantity, fyear } = item;
      labelSet.add(category);

      if (!unitsMap[fyear.fiscalyear][category]) {
        unitsMap[fyear.fiscalyear][category] = 0;
      }
      unitsMap[fyear.fiscalyear][category] += quantity;
    });

    const labelsArray = Array.from(labelSet); 
    const tempDatasets = selectedfyear.map((year, index) => {
      const backgroundColor = index % 2 === 0 ?  "rgb(205, 213, 223)" : "rgb(59, 130, 246)"; 
      const borderColor = index % 2 === 0 ? "rgb(205, 213, 223)": "rgb(59, 130, 246)"; 

      return {
        label: year,
        data: labelsArray.map((label) => unitsMap[year][label] || 0),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      };
    });

    setElables(labelsArray); // Set labels for x-axis
    setDatasets(tempDatasets); // Set datasets for chart
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
      datalabels: {
        display: false,
      },
      title: {
        display: true,
        text: "Disposed Units by Fiscal Year",
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

export default GeneratedChart;

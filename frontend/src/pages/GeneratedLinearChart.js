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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GeneratedLinearChart = ({ wdata, fyear }) => {
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

    const selectedfyear = fyear.map((f) => f.value);

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

    const monthUnitsMap = {};

    const getMonthName = (dateString) => {
      const [year, month] = dateString.split("-");
      return new Date(year, month - 1).toLocaleString("default", {
        month: "long",
      });
    };

    selectedfyear.forEach((year) => {
      monthUnitsMap[year] = {};
    });

    filteredData.forEach((item) => {
      const startMonth = getMonthName(item.start_date);
      const endMonth = getMonthName(item.end_date);
      const year = item.fyear.fiscalyear;

      if (!monthUnitsMap[year][startMonth]) {
        monthUnitsMap[year][startMonth] = 0;
      }
      if (!monthUnitsMap[year][endMonth]) {
        monthUnitsMap[year][endMonth] = 0;
      }

      monthUnitsMap[year][startMonth] += item.quantity;
      if (startMonth !== endMonth) {
        monthUnitsMap[year][endMonth] += item.quantity;
      }
    });

    const allMonths = new Set();
    Object.keys(monthUnitsMap).forEach((year) => {
      Object.keys(monthUnitsMap[year]).forEach((month) => {
        allMonths.add(month);
      });
    });
    const labelsArray = Array.from(allMonths);

    const backgroundColors = ["rgb(59, 130, 246)", "rgb(205, 213, 223)"];

    const tempDatasets = selectedfyear.map((year, index) => {
      const dataValues = labelsArray.map(
        (month) => monthUnitsMap[year][month] || 0
      );
      return {
        label: year,
        data: dataValues,
        fill: false,
        backgroundColor: backgroundColors[index % 2],
        borderColor: backgroundColors[index % 2],
        tension: 0.2,
      };
    });

  
    setElables(labelsArray);
    setDatasets(tempDatasets);
  }, [wdata, fyear]);
  
  if (!fyear || fyear.length === 0) {
    return null;
  }
  
  
  const data = {
    labels: elabels,
    datasets: datasets,
  };

  
  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Generated Units",
        },
        beginAtZero: true,
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
        text: "Generated Units by Fiscal Year",
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
      <Line data={data} options={options} height={250} width={450} />
    </div>
  );
};

export default GeneratedLinearChart;

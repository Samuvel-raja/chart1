import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({ eData = [[]], fyears = [] }) => {
  // console.log("Input eData:", eData);
  // console.log("Selected Fiscal Years:", fyears);

  const actualData = eData[0] || [];

  const labels = [];
  const datasets = fyears.map((year, index) => ({
    label: year.value,
    data: [],
    fill: false,
    backgroundColor:
      index % 2 === 0 ? "rgb(205, 213, 223)" : "rgb(59, 130, 246)",
    borderColor: index % 2 === 0 ? "rgb(205, 213, 223)" : "rgb(59, 130, 246)",
  }));

  if (actualData.length > 0) {
    actualData.forEach((item) => {
      const fiscalYear = item.fyear.fiscalyear;

      const fiscalYearIndex = fyears.findIndex(
        (year) => year.value === fiscalYear
      );
      if (fiscalYearIndex !== -1) {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);

        while (startDate <= endDate) {
          const month = startDate.toLocaleString("default", { month: "short" });

          const labelIndex = labels.indexOf(month);
          if (labelIndex === -1) {
            labels.push(month);

            datasets.forEach((dataset, index) => {
              dataset.data.push(index === fiscalYearIndex ? item.emissions : 0);
            });
          } else {
            datasets[fiscalYearIndex].data[labelIndex] += item.emissions;
          }

          startDate.setMonth(startDate.getMonth() + 1);
        }
      }
    });
  } else {
    console.warn("No data available in actualData");
  }

  // console.log("Generated Labels:", labels);
  // console.log("Datasets:", datasets);

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Emissions",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "80%", height: "90%" }}>
      {labels.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available to display.</p>
      )}
    </div>
  );
};

export default LineChart;

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
            // Ensure item.fyear is not null/undefined before accessing fiscalyear
            if (item.fyear && item.fyear.fiscalyear === flabel) {
              labelSet.add(item.type); // Assuming 'type' is the label you want for Y-axis
              emissions.push(item.emissions);
            }
          });
        } else {
          console.warn("Invalid data format:", val);
        }
      });

      if (emissions.length > 0) {
        const backgroundColor =
          tempDatasets.length % 2 === 0
            ? "rgb(205, 213, 223)"
            : "rgb(59, 130, 246)";
        const borderColor =
          tempDatasets.length % 2 === 0
            ? "rgb(205, 213, 223)"
            : "rgb(59, 130, 246)";

        tempDatasets.push({
          label: flabel, // Fiscal year as label
          data: emissions, // Emission data for this fiscal year
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        });
      }
    });

    if (tempDatasets.length === 0) {
      console.log("No datasets available. Clearing the chart.");
      setElables([]);
      setDatasets([]);
    } else {
      setElables(Array.from(labelSet).sort()); // Y-axis labels
      setDatasets(tempDatasets);
    }
  }, [edata, fyears]);

  const data = {
    labels: elabels, // Labels for the Y-axis
    datasets: datasets, // Data for the chart
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true, // Start X-axis from zero
      },
      y: {
        grid: {
          display: false, // Disable grid lines for Y-axis
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
      },
      datalabels: {
        display: false, // Hide data labels
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} height={100} width={500} />
    </div>
  );
};

export default HorizontalBarChart;

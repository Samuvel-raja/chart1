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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = ({ eData, fyears }) => {
  const [elabels, setElables] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (!eData || eData.length === 0) {
      console.log("No emission data found");
      setElables([]);
      setDatasets([]);
      return;
    }
    if (!fyears || fyears.length === 0) {
      console.log("No fiscal years selected. Clearing the chart.");
      setElables([]);
      setDatasets([]);
      return;
    }

    const labelSet = new Set();
    const scopeData = {
      Scope1: Array(fyears.length).fill(0),
      Scope2: Array(fyears.length).fill(0),
      Scope3: Array(fyears.length).fill(0),
    };

    fyears.forEach((fyear, index) => {
      const flabel = typeof fyear === "object" ? fyear.label : fyear;

      eData.forEach((val) => {
        if (Array.isArray(val)) {
          val.forEach((item) => {
            // Ensure item.fyear exists and is valid before accessing item.fyear.fiscalyear
            if (item.fyear && item.fyear.fiscalyear === flabel) {
              labelSet.add(flabel);

              if (item.scope.trim() === "scope1") {
                scopeData.Scope1[index] += item.emissions;
              } else if (item.scope.trim() === "scope2") {
                scopeData.Scope2[index] += item.emissions;
              } else if (item.scope.trim() === "scope3") {
                scopeData.Scope3[index] += item.emissions;
              }
            }
          });
        }
      });
    });

    const uniqueFiscalYears = Array.from(labelSet);
    setElables(uniqueFiscalYears);

    setDatasets([
      {
        label: "Scope 1",
        data: scopeData.Scope1,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Scope 2",
        data: scopeData.Scope2,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Scope 3",
        data: scopeData.Scope3,
        backgroundColor: "rgba(255, 206, 86, 0.8)",
        borderColor: "rgba(255, 206, 86, 1)",
      },
    ]);
  }, [eData, fyears]);

  if (!fyears || fyears.length === 0) {
    return null;
  }

  const data = {
    labels: elabels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fiscal Year Emissions Data",
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "center",
        align: "center",
        formatter: (value) => value,
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "80%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

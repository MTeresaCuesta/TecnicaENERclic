import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const labels: string[] = ["January", "February", "March", "April", "May", "June", "July"];
const minNumber: number = -1000;
const maxNumber: number = 1000;

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => {
        // Generate a random number between minNumber and maxNumber
        const randomNumber: number = Math.random() * (maxNumber - minNumber) + minNumber;
        return randomNumber;
      }),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => {
        // Generate a random number between minNumber and maxNumber
        const randomNumber: number = Math.random() * (maxNumber - minNumber) + minNumber;
        return randomNumber;
      }),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
  scales: {
    x: {
      type: "category", // Use 'category' scale for x-axis
    },
    y: {
      // Define other scales for the y-axis if needed
    },
  },
};

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Chart.js configuration
    const chartConfig = {
      type: "bar",
      data,
      options,
    };

    // Create the Chart.js chart instance
    const myChart = new Chart(chartRef.current!, chartConfig);

    // Clean up when component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;

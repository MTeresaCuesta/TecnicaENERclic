// DEPENDENCIES
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// UTILS
import { getDayUtil } from "../../utils/dateUtils";
import { randomColors } from "../../utils/FormData";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ graphic }: any) => {
  let title = "";
  let type = 0;
  if (graphic.attributes.content) {
    type = 1;
    title = graphic.attributes.title;
  } else if (graphic.attributes.values) {
    type = 2;
    title = graphic.attributes.title;
  }

  // Save the labels
  let labels = [];
  if (type === 1) {
    labels = graphic.attributes.content[0].attributes.values.map((e: any) => getDayUtil(e.datetime));
  } else if (type === 2) {
    labels = graphic.attributes.values.map((value: any) => getDayUtil(value.datetime));
  }

  // Save the dataset
  let dataset = [];
  if (type === 1) {
    const datas = graphic.attributes.content.map((e: any) => e.attributes);
    dataset = datas.map((e: any, index: number) => {
      return {
        label: datas[index].title,
        data: e.values.map((e: any) => e.value),
        backgroundColor: randomColors[index % randomColors.length],
        borderColor: randomColors[index % randomColors.length],
        borderWidth: 2,
        fill: true,
      };
    });
  } else if (type === 2) {
    dataset = [
      {
        label: graphic.attributes.title,
        data: graphic.attributes.values.map((e) => e.value),
        backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)],
        borderColor: randomColors[Math.floor(Math.random() * randomColors.length)],
        borderWidth: 2,
        fill: true,
      },
    ];
  }

  const chartData = {
    labels: labels,
    datasets: [...dataset],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

// DEPENDENCIES
import { Bar } from "react-chartjs-2";
// UTILS
import { getDayUtil } from "../../utils/dateUtils";

interface BarComponentProps {
  graphic: any;
}

const BarComponent = ({ graphic }: BarComponentProps) => {
  let title = "";
  let type = 0;
  if (graphic.attributes.content) {
    type = 1;
    title = graphic.attributes.title;
  } else if (graphic.attributes.values) {
    type = 2;
    title = graphic.attributes.title;
  }

  const options: any = {
    responsive: true,
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

  // Save the labels
  let labels = [];
  if (type === 1) {
    labels = graphic.attributes.content[0].attributes.values.map((e: any) => getDayUtil(e.datetime));
  } else if (type === 2) {
    labels = graphic.attributes.values.map((value: any) => getDayUtil(value.datetime));
  }

  const randomColors = ["#FF5733", "#3399FF", "#FF33FF", "#33FF99", "#FFFF33", "#9933FF", "#33FFFF"];

  // Save the dataset
  let dataset = [];
  if (type === 1) {
    const datas = graphic.attributes.content.map((e: any) => e.attributes);
    dataset = datas.map((e: any, index: number) => {
      return {
        label: datas[index].title,
        data: e.values.map((e: any) => e.value),
        backgroundColor: randomColors[index % randomColors.length],
      };
    });
  } else if (type === 2) {
    dataset = [
      {
        label: graphic.attributes.title,
        data: graphic.attributes.values.map((e) => e.value),
        backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)],
      },
    ];
  }

  const data = {
    labels,
    datasets: [...dataset],
  };

  return <Bar data={data} options={options} />;
};

export default BarComponent;
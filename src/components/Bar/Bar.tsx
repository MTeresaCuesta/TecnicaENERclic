// DEPENDENCIES
import { Bar } from "react-chartjs-2";
// UTILS
import { getDayUtil } from "../../utils/dateUtils";

const BarComponent = ({ graphic }: any) => {
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

  let labels = [];
  if (type === 1) {
    labels = graphic.attributes.content[0].attributes.values.map((e: any) => getDayUtil(e.datetime));
  }

  let superdato: any = {};
  let prueba = [];
  if (type === 1) {
    superdato = graphic.attributes.content.map((e: any) => e.attributes);
    prueba = superdato.map((e: any, index: number) => {
      return {
        label: superdato[index].title,
        data: e.values.map((e: any) => e.value),
        backgroundColor: "rgb(255, 99, 132)",
      };
    });
  }

  const data = {
    labels,
    datasets: [...prueba],
  };

  return <Bar data={data} options={options} />;
};

export default BarComponent;

import { Bar } from "react-chartjs-2";
import { getDayUtil } from "../../utils/dateUtils";

// Definimos la interfaz para las propiedades que recibirá el componente BarComponent
interface BarComponentProps {
  graphic: any;
}

const BarComponent = ({ graphic }: BarComponentProps) => {
  let title = "";
  let type = 0; // Variable para identificar el tipo de gráfico (1 para gráfico con atributos "content", 2 para gráfico con atributos "values")

  // Comprobamos el tipo de gráfico y asignamos el título en consecuencia
  if (graphic.attributes.content) {
    type = 1;
    title = graphic.attributes.title;
  } else if (graphic.attributes.values) {
    type = 2;
    title = graphic.attributes.title;
  }

  // Configuración de opciones para el gráfico
  const options: any = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
  };

  // Guardamos las etiquetas (labels) para el eje X del gráfico
  let labels = type === 1 ? graphic.attributes.content[0].attributes.values.map((e: any) => getDayUtil(e.datetime)) : graphic.attributes.values.map((value: any) => getDayUtil(value.datetime));


  const randomColors = ["#FF5733", "#3399FF", "#FF33FF", "#33FF99", "#FFFF33", "#9933FF", "#33FFFF"];

  // Guardamos los datasets del gráfico
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
    dataset = [{ label: graphic.attributes.title, data: graphic.attributes.values.map((e) => e.value), backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }];
  }

  const data = { labels, datasets: [...dataset] };

  // Devolvemos el componente de gráfico de barras con los datos y opciones
  return <Bar data={data} options={options} />;
};

export default BarComponent;

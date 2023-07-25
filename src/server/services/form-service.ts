// DEPENDENCIES
import axios from "axios";

export const getDataService = async (search: any) => {
  const { lang, category, widget, startDate, endDate, timeTrunc } = search;
  const url = `https://apidatos.ree.es/${lang}/datos/${category}/${widget}?start_date=${startDate}T00:00&end_date=${endDate}T23:59&time_trunc=${timeTrunc}`;

  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// SERVICES
import { getDataService } from "../services/form-service";

export const getDataHandler = async (search: any) => {
  const response = await getDataService(search);
  if (response.data) return response;
  return null;
};

// SERVICES
import { loginService } from "../services/login-service";

export const loginHandler = async (username: string, password: string) => {
  const response = await loginService(username, password);
  if (response.token) {
    localStorage.setItem("token", response.token);
  }
  return response;
};

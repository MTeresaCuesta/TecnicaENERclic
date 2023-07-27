// DEPENDENCIES
import axios from "axios";

export const loginService = async (username: string, password: string) => {
  const url = "https://fakestoreapi.com/auth/login";

  return axios
    .post(url, {
      username,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw "Username or password incorrect";
    });
};

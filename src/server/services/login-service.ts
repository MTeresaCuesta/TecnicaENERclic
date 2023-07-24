export const loginService = async (username: string, password: string) => {
  return fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      username: "mor_2314",
      password: "83r5^_",
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log(err));
};

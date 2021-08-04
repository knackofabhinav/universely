import axios from "axios";

// let authToken;
// export const setAuthTokenForAPI = (token) => {
//   authToken = token;
// };
// console.log(authToken);

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: JSON.parse(localStorage.getItem("authToken")),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { API };

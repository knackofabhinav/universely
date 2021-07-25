import axios from "axios";
if (localStorage.getItem("authToken") == null || undefined) {
}
// const authToken = JSON.parse(localStorage.getItem("authToken"));
// console.log(authToken);

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    // Authorization: authToken,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { API };

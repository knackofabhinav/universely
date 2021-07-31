import axios from "axios";
const authToken = JSON.parse(localStorage.getItem("authToken"));
const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: authToken,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { API };

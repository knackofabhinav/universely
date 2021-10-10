import axios from "axios";

export const setInitialAPI = () => {
  axios.defaults.baseURL = "http://localhost:3000/";
  axios.defaults.headers.common["Authorization"] = JSON.parse(
    localStorage.getItem("authToken")
  );
};

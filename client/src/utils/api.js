import axios from "axios";

export const setInitialAPI = () => {
  axios.defaults.baseURL = "http://167.71.233.233/";
  axios.defaults.headers.common["Authorization"] = JSON.parse(
    localStorage.getItem("authToken")
  );
};

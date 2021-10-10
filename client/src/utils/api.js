import axios from "axios";

export const setInitialAPI = () => {
  axios.defaults.baseURL = "https://universely.herokuapp.com/";
  axios.defaults.headers.common["Authorization"] = JSON.parse(
    localStorage.getItem("authToken")
  );
};

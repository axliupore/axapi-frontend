import axios from "axios";
import token from "@/utils/token";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const t = token.getToken();
    if (token) {
      config.headers["a-token"] = t;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

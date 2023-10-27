import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

myAxios.interceptors.request.use(
  (config) =>{
    config.withCredentials = true;
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)
privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.withCredentials = true;
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
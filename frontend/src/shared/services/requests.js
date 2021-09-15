import axios from "axios";

const API_URL = "http://localhost:5000/api";

// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const GET = (url) => {
  return axios.get(`${API_URL}/${url}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const POST = async (url, data) => {
  return axios(`${API_URL}/${url}`, {
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH = async (url, data) => {
  return axios(`${API_URL}/${url}`, {
    method: "PATCH",
    data,
  });
};

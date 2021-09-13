import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const GET = (url) => {
  return axios.get(`${API_URL}/${url}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
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

import axios from "axios";

// const API_URL = "https://u11-fullstack-app.herokuapp.com/api";
const API_URL = "http://localhost:5000/api";

export const GET = (url) => {
  return axios.get(`${API_URL}/${url}`, {
    headers: {
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
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const PATCH = async (url, id, data) => {
  return axios(`${API_URL}/${url}/${id}`, {
    method: "PATCH",
    data,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

export const DELETE = async (url, id) => {
  return axios(`${API_URL}/${url}/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

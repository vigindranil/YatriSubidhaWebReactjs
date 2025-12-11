import Cookies from "react-cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const callApi = async (url, request_body) => {
  const TOKEN = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request_body),
  });

  if (response.status === 401) {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type_id");
    localStorage.removeItem("user_type_name");
    localStorage.removeItem("user_full_name");
    localStorage.removeItem("access_token");
  } else {
    return await response.json();
  }
};

export const callGetApi = async (url) => {
  const TOKEN = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type_id");
    localStorage.removeItem("user_type_name");
    localStorage.removeItem("user_full_name");
    localStorage.removeItem("access_token");
  } else {
    return await response.json();
  }
};

export const callApiWithoutToken = async (url, request_body = {}) => {

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request_body),
  });

  return await response.json();

};


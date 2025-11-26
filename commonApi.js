import Cookies from "react-cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const callApi = async (url, request_body) => {
  const TOKEN = Cookies.load("access_token");

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
    Cookies.remove("user_id");
    Cookies.remove("user_type_id");
    Cookies.remove("user_type_name");
    Cookies.remove("user_full_name");
    Cookies.remove("access_token");
  } else {
    return await response.json();
  }
};

export const callGetApi = async (url) => {
  const TOKEN = Cookies.load("access_token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    Cookies.remove("user_id");
    Cookies.remove("user_type_id");
    Cookies.remove("user_type_name");
    Cookies.remove("user_full_name");
    Cookies.remove("access_token");
  } else {
    return await response.json();
  }
};

export const callApiWithoutToken = async (url, request_body={}) => {

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


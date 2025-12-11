import { decryptPayload, encryptPayload } from "@/utils/encryption";
import Cookies from "react-cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const callApi = async (url: string, request_body: any): Promise<any> => {
  const TOKEN = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");

  // Merge request body + userId
  const finalBody = { ...request_body, UserID: userID };

  // 🔐 Encrypt the payload
  const encryptedData = encryptPayload(finalBody);

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      accept: "/",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: encryptedData }), // send encrypted payload
  });

  if (response.status === 401) {
    // localStorage.removeItem("userID");
    // localStorage.removeItem("token");
  } else {
    const data = await response.json();
    // const decryptedData = decryptPayload(data);
    // return decryptedData;
    return data;
  }
};
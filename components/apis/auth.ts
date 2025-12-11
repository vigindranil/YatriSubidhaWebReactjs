// import { decryptPayload } from "@/utils/encryption";
// import cookie from "react-cookies";
import Cookies from 'js-cookie';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to send OTP
export const generateOTP = async (type: string = "email", user_name: string) => {
  try {
    const response = await fetch(`${BASE_URL}auth/generate-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userNameTypeID": type === "email" ? 2 : 1,
        "userName": user_name,
        "authInfo": "{}"
      }),
    });

    
    
    // const encData = await response.json();
    // const data = decryptPayload(encData.data);
    const data = await response.json();
    return data;

  } catch (error) {
    return { success: false, error: "Network error, please try again." };
  }
};

// Function to verify OTP
export const verifyOTP = async (user_name: string, otp: string) => {
  try {
    const response = await fetch(`${BASE_URL}auth/validate-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": user_name,
        "otp": otp,
        "authInfo": "{}"
      }),
    });


    // const encData = await response.json();
    // const data = decryptPayload(encData.data);
    const data = await response.json();

    console.log("aksh", data?.data?.authToken);

    localStorage.setItem("token", data?.data?.authToken);
    localStorage.setItem("userID", data?.data?.UserID);
    // if (data?.success) {
    //   console.log("aksh", data);
    // }

    return data;
  } catch (error) {
    return { success: false, error: "Network error, please try again." };
  }
};

export const adminLogin = async (user_name: string, password: string, user_type_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}admin/auth/get-admin-login-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "UserName": user_name,
        "Password": password,
        "UserTypeID": user_type_id,
        "AuthInfo": "{}"
      }),
    });


    // const encData = await response.json();
    // const data = decryptPayload(encData.data);
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data?.data?.authToken);
      localStorage.setItem("userID", data?.data?.user_id);
      localStorage.setItem("userName", data?.data?.user_name);
      localStorage.setItem("userTypeID", data?.data?.user_type_id);
      localStorage.setItem("userFullName", data?.data?.user_full_name);
    }
    
    return data;
  } catch (error) {
    return { success: false, error: "Network error, please try again." };
  }
};
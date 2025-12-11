const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { decryptPayload } from "@/utils/encryption";
import Cookies from "react-cookies";

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
    if (data?.success) {
      console.log("aksh", data);
      Cookies.save("token", data?.data?.authToken, { path: "/", maxAge: 60 * 60 * 24 });
      Cookies.save("userID", data?.data?.UserID, { path: "/", maxAge: 60 * 60 * 24 });
    }

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
      Cookies.save("token", data?.data?.authToken, { path: "/", maxAge: 60 * 60 * 24 });
      Cookies.save("userID", data?.data?.user_id, { path: "/", maxAge: 60 * 60 * 24 });
      Cookies.save("userName", data?.data?.user_name, { path: "/", maxAge: 60 * 60 * 24 });
      Cookies.save("userTypeID", data?.data?.user_type_id, { path: "/", maxAge: 60 * 60 * 24 });
      Cookies.save("userFullName", data?.data?.user_full_name, { path: "/", maxAge: 60 * 60 * 24 });
    }
    
    return data;
  } catch (error) {
    return { success: false, error: "Network error, please try again." };
  }
};
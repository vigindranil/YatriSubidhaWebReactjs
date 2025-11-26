const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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
    

    const data = await response.json();
    console.log(data);
    

    return data;
  } catch (error) {
    return { success: false, error: "Network error, please try again." };
  }
};
import Cookies from "react-cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const callApi = async (url: string, request_body: any): Promise<any> => {
    const TOKEN = Cookies.load("token");

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: {
            accept: "/",
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request_body),
    });

    if (response.status === 401) {
        Cookies.remove("userID");
        Cookies.remove("token");
    } else {
        return await response.json();
    }
};
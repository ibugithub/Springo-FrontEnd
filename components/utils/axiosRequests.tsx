"use client"
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const AxiosRequests = () => {
  const access_token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;
  const parsedAccessToken = access_token ? JSON.parse(access_token) : null;
  const refresh_token = Cookies.get("refresh_token");
  const baseUrl = "http://127.0.0.1:8000/api";
  const headers = {
    Authorization: `Bearer ${parsedAccessToken}`,
    "Content-Type": "application/json",
  };
  const reqInstance = axios.create({
    baseURL: baseUrl,
    headers: headers,
    withCredentials: true,
  });

  reqInstance.interceptors.request.use(async (req) => {
    if (access_token) {
      const user = jwtDecode(access_token);
      const isExpired = dayjs.unix(user.exp ?? 0).diff(dayjs()) < 1;
      if (isExpired) {
        const url = `${baseUrl}/accounts/refresh`;
        const data = { refresh: refresh_token };
        try {
          const res = await axios.post(url, data);
          if (res.status === 200) {
            const newToken = res.data.access;
            const authorization = `Bearer ${newToken}`;
            localStorage.setItem("access_token", JSON.stringify(newToken));
            req.headers.Authorization = authorization;
            toast.success("Token regenereted successfully")
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    }
    return req;
  });

  return reqInstance;
};

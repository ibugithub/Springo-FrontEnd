"use client"
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { BaseUrl } from "./baseUrl";
import { CustomRouter } from "../interface";

export const AxiosRequests = (router? : CustomRouter) => {
  const access_token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;
  const parsedAccessToken = access_token ? JSON.parse(access_token) : null;
  const refresh_token = Cookies.get("refresh_token");
  const requestBaseUrl = `${BaseUrl}/api`;
  const headers = {
    Authorization: `Bearer ${parsedAccessToken}`,
    "Content-Type": "application/json",
  };
  const reqInstance = axios.create({
    baseURL: requestBaseUrl,
    headers: headers,
    withCredentials: true,
  });

  reqInstance.interceptors.request.use(async (req) => {
    if (access_token) {
      const user = jwtDecode(access_token);
      const isExpired = dayjs.unix(user.exp ?? 0).diff(dayjs()) < 1;
      if (isExpired) {
        const url = `${requestBaseUrl}/accounts/refresh`;
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
        } catch (error : any) {
          if (error.response.status === 401) {
            if (router) {router.push('/signin')}
          }
          console.error("Error refreshing token:", error);
        }
      }
    }
    return req;
  });

  return reqInstance;
};

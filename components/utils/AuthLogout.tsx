"use client"
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AxiosRequests } from "./axiosRequests";
import { CustomRouter } from "../interface";
import { Dispatch, SetStateAction } from 'react';

export const HandleLogout = async (router: CustomRouter, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const reqInstance = AxiosRequests(router);
  const refresh_token = Cookies.get("refresh_token")
  const formData = { "refresh_token": refresh_token }
  const url = "/accounts/logout"
  try {
    const res = await reqInstance.post(url, formData);
    if (res.status === 200) {
      localStorage.clear();
      Cookies.remove('refresh_token')
      toast.success("Logout successful");
      router.push("/");
      setIsLoading(false);
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      router.push("/signin");
      toast.error("Session expired");
    } else {
      console.error("Logout error:", error.response);
      toast.error("An error occurred during logout");
    }
    setIsLoading(false);
  }
};

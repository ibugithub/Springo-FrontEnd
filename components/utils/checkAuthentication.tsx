import { useEffect, useState } from "react"
import { BaseUrl } from "./baseUrl";
import { AxiosRequests } from "./axiosRequests";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const CheckAuthentication = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const router =  useRouter();
  const requestIntance = AxiosRequests();
  const url = `${BaseUrl}/accounts/checkAuth`;

  const check = async(token: string) => {
    const  parsedToken = JSON.parse(token);
    const header = {
      Authorization:  `Bearer ${parsedToken}`,
      "Content-Type": "application/json"
    }
    try {
      const res = await requestIntance.get(url, {headers: header})
      if (res.status === 200) {
        setisAuthenticated(true)
      }
    } catch (err : any) {
      console.error("CheckAuthentication error: ", err )
      if (err.response.status !== 200) {
        toast.info("Session Expired")
        router.push('/signin')
        return;
      } 
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      check(token);
    } else {
      toast.info("Session Expired")
      router.push('/signin')
      return;
    }
  }, []);
  return isAuthenticated;
}
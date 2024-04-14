import { useEffect, useState } from "react"
import { AxiosRequests } from "./axiosRequests";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const CheckAuthentication = (showMsg: boolean = true) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const router = useRouter();
  const requestIntance = AxiosRequests(router);
  const url = `/accounts/checkAuth`;

  const check = async (token: string) => {
    const parsedToken = JSON.parse(token);
    const header = {
      Authorization: `Bearer ${parsedToken}`,
      "Content-Type": "application/json"
    }
    try {
      const res = await requestIntance.get(url)
      if (res.status === 200) {
        setisAuthenticated(true)
      }
    } catch (err: any) {
      console.error("CheckAuthentication error: ", err)
      if (err.response.status !== 200) {
        if (showMsg) {
          toast.info("Session Expired")
          router.push('/signin')
        }
        return;
      } else {
        console.error("unKnown Error at checkAuthentication", err)
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      check(token);
    } else {
      if (showMsg) {
        toast.info("Session Expired")
        router.push('/signin')
      }
      return;
    }
  }, []);
  return isAuthenticated;
}

export const authenticated = CheckAuthentication;
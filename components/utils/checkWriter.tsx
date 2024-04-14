import { useEffect, useState } from "react"
import { AxiosRequests } from "./axiosRequests";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const CheckWriter = () => {
  const [isWriter, setIsWriter] = useState(false);
  const router = useRouter();
  const requestIntance = AxiosRequests(router);
  const url = '/stories/check_isWriter/';

  const check = async (token: string) => {
    const parsedToken = JSON.parse(token);
    const header = {
      Authorization: `Bearer ${parsedToken}`,
      "Content-Type": "application/json"
    }
    try {
      console.log('the header is ', header)
      const res = await requestIntance.get(url, { headers: header })
      console.log('the response is ', res)
      if (res.status === 200) {
        setIsWriter(true)
      }
    } catch (err: any) {
      setIsWriter(false)
      console.error("unKnown Error at checkAuthentication", err)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      check(token);
      return
    } else {
      toast.info("Session Expired")
      router.push('/signin')
      return;
    }
  }, []);
  return isWriter;
}
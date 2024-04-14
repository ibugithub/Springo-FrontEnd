import { useEffect, useState } from "react"
import { AxiosRequests } from "./axiosRequests";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const CheckWriter = () => {
  const [isWriter, setIsWriter] = useState(false);
  const router = useRouter();
  const requestIntance = AxiosRequests(router);
  const url = '/stories/check_isWriter/';

  useEffect(() => {
    const check = async () => {
      try {
        const res = await requestIntance.get(url)
        if (res.status === 200) {
          setIsWriter(true)
        }
      } catch (err: any) {
        setIsWriter(false)
        console.error("unKnown Error at checkAuthentication", err)
        toast.info("Session Expired")
        router.push('/signin')
      }
    }
    check();
  }, [requestIntance, router]);
  return isWriter;
}
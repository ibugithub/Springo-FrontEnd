import { useEffect, useState } from "react"
import { AxiosRequests } from "./axiosRequests";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const CheckWriter = () => {
  const [isWriter, setIsWriter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const requestIntance = AxiosRequests(router);
  const url = '/stories/check_isWriter/';

  useEffect(() => {
    const check = async () => {
      try {
        const res = await requestIntance.get(url)
        if (res.status === 200) {
          setIsWriter(true);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err.response.status === 403) {
          setIsLoading(false);
          setIsWriter(false)
        } else if (err.response.status === 401) {
          toast.info("Session Expired")
          router.push('/signin')
        } else {
          console.error("unKnown Error at checkAuthentication", err)
        }
      }
    }
    check();
  }, [requestIntance, router]);
  return { isWriter, setIsWriter, isLoading };
}
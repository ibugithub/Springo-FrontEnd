'use client'
import { HandleLogout } from "../utils/AuthLogout"
import { useRouter } from "next/navigation"

export const Logout = () => {
  const router = useRouter();
  HandleLogout(router);
  return (
    <>
      <div className="flex justify-center">
        <div className="">Logging you out...</div>
      </div>

    </>
  )
}
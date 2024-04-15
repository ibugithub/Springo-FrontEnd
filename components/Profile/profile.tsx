"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HandleLogout } from "../utils/AuthLogout";
import { CheckAuthentication } from "../utils/checkAuthentication";

const Profile = () => {
  CheckAuthentication();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });


  useEffect(() => {
    const storedName = localStorage.getItem("name") ?? "";
    const storedEmail = localStorage.getItem("email") ?? "";
    setUserInfo({
      name: storedName,
      email: storedEmail,
    });
  }, []);


  const handleLogoutClick = () => {
    setIsLoading(true);
    HandleLogout(router, setIsLoading);
  };

  if(isLoading) {
    return (
      <div className="flex justify-center"><div className="mt-14">Logging you out..</div></div>
    )
  }

  return (
    <>
      <h1 className="text-center p-3">Profile</h1>
      <div className="flex flex-col items-center mt-20 gap-2 ">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="p-3 bg-red-600"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;

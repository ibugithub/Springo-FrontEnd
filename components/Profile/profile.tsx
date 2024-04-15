"use client";
import React, { useState, useEffect } from "react";
import { CheckAuthentication } from "../utils/checkAuthentication";

const Profile = () => {
  CheckAuthentication();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedName = localStorage.getItem("name") ?? "";
        const storedEmail = localStorage.getItem("email") ?? "";

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUserInfo({
          name: storedName,
          email: storedEmail,
        });
        setLoadingProfile(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <h1 className="text-center p-3">Profile</h1>
      {loadingProfile ? (
        <div className="flex justify-center">
          <div className="mt-14">Loading profile data...</div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 gap-2 ">
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <div className="flex justify-center mt-4">
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

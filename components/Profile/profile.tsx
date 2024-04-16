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
      <h2 className='text-center text-2xl text-red-600 mb-10'>Page is under construction....</h2>
      {loadingProfile ? (
        <div className="flex justify-center">
          <div className="">Loading profile data...</div>
        </div>
      ) : (
        <>
          <div className="flex gap-2 justify-between ">

            <div className="w-[45%] flex justify-center">
              <div>

                <div className="flex flex-col gap-2 ">
                  <p>Name: {userInfo.name}</p>
                  <p>Email: {userInfo.email}</p>
                  <div className="flex justify-center mt-4">
                  </div>
                </div>

              </div>
            </div>

            <div className="flex w-[45%] justify-center">

              <div className="flex-col flex">
                <div><a href="/uploadStory"> Write Story </a> </div>
                <div> <a href="/logout"> Log Out </a></div>
              </div>

            </div>

          </div>
        </>
      )}
    </>
  );
};

export default Profile;

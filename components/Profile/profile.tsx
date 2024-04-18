"use client";
import React, { useState, useEffect } from "react";
import { CheckAuthentication } from "../utils/checkAuthentication";
import Avatar from "../../public/images/woman.png"
import Image from "next/image";

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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow p-5 md:p-20 mx-2 md:mx-0">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Profile</h2>
        {loadingProfile ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full max-w-4xl">
              <div className="flex-1 flex flex-col items-center text-center">
                <Image className="w-32 h-32 rounded-full mb-4" src={Avatar} alt="Profile avatar" />
                <h3 className="text-2xl font-semibold">{userInfo.name}</h3>
                <p className="text-md text-gray-600">{userInfo.email}</p>
                <div className="mt-4">
                  <a className="text-md hover:underline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/stories/indeStories">My Stories</a>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
  
  
};

export default Profile;

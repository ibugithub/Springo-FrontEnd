"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import "../../styles/login-register.css"; 
import Image from "next/image";
import { BaseUrl } from "../utils/baseUrl";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${BaseUrl}/api/accounts/login`;
      const req = await axios.post(
        url,
        formData
      );
      if (req.status === 200) {
        const response = req.data;
        localStorage.setItem("name", JSON.stringify(response.full_name));
        localStorage.setItem("username", JSON.stringify(response.username));
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.access_token)
        );
        const cookieName = "refresh_token";
        const cookieValue = response.refresh_token;
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/; SameSite=strict`;
        router.push("/profile");
        toast.success("Login successful");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 401
        ) {
          console.log('Credentials error')
          setError("Email or password is incorrect");
        } else {
          console.log("unknown Error: ", error);
          toast.error("An Error has occurred");
        }
      } else {
        console.log("Unhandled Error:", error);
        toast.error("An unKnown error occurred");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="picture-section"></div>
        <div className="login-content">
          <div className="logo-card-header">
            <Image src={logoImage} alt="Logo" className="logo-card" />
            <span className="login-card-text">Sign in</span>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <span className="text-red-500">{error}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="p-1 text-red-900"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="p-1 text-red-900"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center mt-2">
              <input type="submit" value="Sign In" className="submit-btn" />
            </div>
          </form>
          <div>
            <p>
              Dont have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

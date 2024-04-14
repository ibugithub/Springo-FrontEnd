"use client";

import React, { FormEvent, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import "../../styles/login-register.css";
import Image from "next/image";
import { signupResponseData } from "../interface";
import { BaseUrl } from "../utils/baseUrl";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, first_name, last_name, password, password2 } = formData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !first_name || !last_name || !password || !password2) {
      setError("All fields are required");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const url = `${BaseUrl}/api/accounts/register`;
      const req: AxiosResponse<any> = await axios.post(
        url,
        formData
      );
      if (req.status === 201) {
        toast.success("Registration successful");
        router.push("/signin");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as signupResponseData;
          console.log("the  response data is ", responseData)
          if (responseData && responseData.email){
            setError(responseData.email[0]);
          } else if (responseData && responseData.password) {
            setError("Password must have at least 6 ");
          }
        } else {
          console.log("Error:", axiosError.message);
          setError("Network error. Please try again later.");
        }
      } else {
        console.log("Unknown error: ", error);
        setError("An unknown error occurred.");
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
            <span className="login-card-text">Sign up</span>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <span className="text-red-500">{error}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="p-1 text-red-900"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="p-1 text-red-900"
                value={first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="p-1 text-red-900"
                value={last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-1 text-red-900"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                className="p-1 text-red-900"
                value={password2}
                onChange={handleChange}
              />
            </div>
            <div className="text-center mt-2">
              <input type="submit" value="Sign Up" className="submit-btn" />
            </div>
          </form>
          <div>
            <p>
              Dont have an account? <a href="/signin">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

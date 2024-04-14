"use client"

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../utils/baseUrl";
import { CheckWriter } from "../utils/checkWriter";
import { AxiosRequests } from "../utils/axiosRequests";

export const Uploadprod = () => {
  const customRequest = AxiosRequests();
  const isWriter = CheckWriter();

  const [formData, setFormData] = useState({
    name: "",
    story: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BaseUrl}/api/stories/create_story/`
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success("Story uploaded successfully")
    } catch (error) {
      console.error("Error While uplaoding", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleRegisterAsWriter = () => {
    
  }

  if (!isWriter) {
    return (
      <div className="text-center pt-20">
        <div>
          You must have to be a writer to write stories
        </div>
        <button className="bg-dark" onClick={handleRegisterAsWriter}>Click here to register as a writer</button>
      </div>

    );
  }

  return (
    <>
      <div className="text-center mt-[9rem]">
        <h1>Let&apos;s Write some Story</h1>
      </div>

      <form className=" ">
        <div className="flex flex-col gap-2 w-[250px] mx-auto">
          <input className="text-red-900" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <textarea className="text-red-900" name="story" placeholder="Description" value={formData.story} onChange={handleChange} />
          <button type="submit" onClick={handleSubmit} className="bg-red-900 text-white"> Publish </button>
        </div>
      </form>
    </>
  );
}


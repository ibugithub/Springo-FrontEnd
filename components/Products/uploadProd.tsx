"use client"

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Uploadprod = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/company/create_device/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success("product uploaded successfully")
    } catch (error) {
      console.error("Error While uplaoding", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <>
      <div className="text-center mt-[9rem]">
        <h1>Let&apos;s upload some Device</h1>
      </div>

      <form className=" ">
        <div className="flex flex-col gap-2 w-[250px] mx-auto">
          <input className="text-red-900" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input className="text-red-900" type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <button type="submit" onClick={handleSubmit} className="bg-red-900 text-white"> Submit </button>
        </div>
      </form>
    </>
  );
}


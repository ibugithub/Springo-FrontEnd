"use client"

import React, { useState } from "react";
import { toast } from "react-toastify";
import { CheckWriter } from "../utils/checkWriter";
import { AxiosRequests } from "../utils/axiosRequests";
import { useRouter } from "next/navigation";

export const Uploadprod = () => {
  const customRequest = AxiosRequests();
  const router = useRouter();
  const [error, setError] = useState('');
  const { isWriter, setIsWriter, isLoading } = CheckWriter();
  const [formData, setFormData] = useState({
    name: "",
    story: "",
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/stories/create_story/"
      if (!formData.name) {
        setError('Please provide a name')
        return;
      }
      if (!formData.story) {
        setError('Please provide a story')
        return;
      }
      const response = await customRequest.post(url, formData)
      if (response.status === 201) {
        setFormData({ name: "", story: "" })
        router.push('/stories')
        toast.success("Story uploaded successfully")
      }
    } catch (error) {
      console.error("Error While uplaoding", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleRegisterAsWriter = async () => {
    const url = "/stories/make_writer/";
    try {
      const res = await customRequest.get(url)
      if (res.status === 200) {
        setIsWriter(true)
        toast.success("you are a writer now")
      }
    } catch (error) {
      console.error("Error in uploadStory", error);
    }
  }

  return (
    <div className="mb-20 ">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900">
          </div>
        </div>
      ) : isWriter ? (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-14">Let&apos;s Write a Story</h2>
          <div className="flex flex-col items-center">
            <span className="text-red-600 mb-4">{error}</span>
            <form className="w-full max-w-lg">
              <div className="flex flex-col gap-4">
                <input className="border-b-2 border-blue-600 px-4 py-2 text-lg text-blue-900 placeholder-gray-500 focus:outline-none focus:border-blue-700 transition duration-300" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <textarea className="border border-blue-600 px-4 py-2 text-lg text-blue-900 placeholder-gray-500 focus:outline-none focus:border-blue-700 transition duration-300" name="story" placeholder="Story" value={formData.story} onChange={handleChange} />
              </div>
              <button type="submit" onClick={handleSubmit} className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Publish</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center mb-8">
            <p className="text-2xl text-blue-600 font-bold">You must be a writer to write stories</p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={handleRegisterAsWriter}>Register as a writer</button>
          </div>
        </div>
      )}
    </div>
  );
}


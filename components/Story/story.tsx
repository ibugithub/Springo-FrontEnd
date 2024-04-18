"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Story } from "../interface";
import { BaseUrl } from "../utils/baseUrl";

export const ShowStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = async () => {
    try {
      const url = `${BaseUrl}/api/stories/show_story/`
      const response = await axios.get(url);
      if (response.status === 200) {
        setStories(response.data);
        setIsLoading(false);
      } else {
        setStories([]);
        setIsLoading(false);
      }

    } catch (error) {
      console.error("Error fetching stories:", error);
      setStories([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      fetch();
    };
    fetchStories();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {isLoading ? (
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            Loading data...
          </div>
        </div>
      ) : (
        <>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <a href="/uploadStory" className="text-2xl font-bold text-cyan-600 hover:text-cyan-700">Write Your Own Story</a>
          </div>
          <div className="mt-8">
            {stories.map((story) => (
              <div key={story.id} className="mb-4 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800">{story.name}</h2>
                <p className="mt-2 text-sm text-gray-500">by <span className="font-medium text-green-400">{story.author}</span></p>
                <p className="mt-2 text-gray-700">Description: {story.story}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  

};

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
    <div className="bg-white text-red-900 pl-10 pb-10">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="">Loading data...</div>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div><a href="/uploadStory" className="text-green-600">Write Your Own Story</a></div>
          </div>
          <div>
            {stories.map((story) => (
              <div key={story.id}>
                <span className="text-2xl ">{story.name}</span> by <span className="text-2xl text-green-400"> {story.author}</span>
                <p>Description: {story.story}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

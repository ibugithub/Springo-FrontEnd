"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Story } from "../interface";
import { BaseUrl } from "../utils/baseUrl";

export const ShowStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const fetch = async () => {
    const url = `${BaseUrl}/api/stories/show_story/`
    const response = await axios.get(url);
    setStories(response.data);
  };

  useEffect(() => {
    const fetchStories = async () => {
      fetch();
    };
    fetchStories();
  }, []);
  console.log('the stories are ', stories)
  return (
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h2 className='mb-14 text-2xl text-red-600'>Page is under construction....</h2>
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
    </div>
  );
};

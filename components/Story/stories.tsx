"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Story } from "../interface";
import Link from "next/link";
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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div  className="text-2xl text-gray-600">Loading Story...</div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <a href="/uploadStory" className="text-lg text-green-600 hover:underline">
                Write Your Own Story
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-2">{story.name}</h2>
                  <p className="text-gray-600 mb-4">
                    by <span className="text-green-600">{story.author}</span>
                  </p>
                  <p className="text-gray-700">
                  {story.story.length > 100 ? story.story.substring(0, 200) + "..." : story.story}
                  {story.story.length > 100 && <Link  href={`/stories/story/${story.id}`} className="text-green-500">Read more</Link>}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

};

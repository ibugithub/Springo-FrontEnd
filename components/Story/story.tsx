"use client"

import { useEffect, useState } from "react";
import { BaseUrl } from "../utils/baseUrl";
import axios from "axios";
import { storyIdProps } from "../interface";
import { Story } from "../interface";

export const ShowStory = ({ id }: storyIdProps) => {
  const url = `${BaseUrl}/api/stories/show_story/${id}/`
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(url)
        if (res.status === 200) {
          setStory(res.data)
          setIsLoading(false)
          console.log('the response is ', res.data)
        }
      } catch (err) {
        console.error("Error while fetching single story at story.tsx", err);
      }
    }
    fetchStory();
  }, [url])
  return (
    <>
      <div className="pt-[1rem] pb-[1rem] bg-gradient-to-r from-black to-blue-900 min-h-screen flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900">
              </div>
            </div>
          ) : (
            <>
              {story && (
                <>
                  <h1 className="text-3xl font-semibold mb-6 text-gray-900">{story.name}</h1>
                  <p className="text-gray-600 mb-4">
                    by <span className="text-green-600">{story.author}</span>
                  </p>
                  <div className="text-gray-700 leading-7">
                    {story.story}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
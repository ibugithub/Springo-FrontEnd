"use client";

import React, { useState, useEffect } from "react";
import { EditStory } from "./editStory";
import { toast } from "react-toastify";
import { Story } from "../interface";
import { AxiosRequests } from "../utils/axiosRequests";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckWriter } from "../utils/checkWriter";


export const ShowIndeStory = () => {
  const router = useRouter();
  const { isWriter, setIsWriter } = CheckWriter();
  const customRequest = AxiosRequests();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isLoading, setLoading] = useState(true);
  const fetch = async () => {
    try {
      const url = `/stories/show_inde_story/`
      const response = await customRequest.get(url);
      setStories(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.response.status === 403) {
        toast.error("You are not a writer");
        return;
      } else {
        setLoading(false);
        console.error("Error while fetching IndeStory at indeStory page", err);
        router.push('/signin');
      }
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      fetch();
    };
    fetchStories();
  }, []);

  const handleEdit = (story: Story) => {
    setEditingStory(story);
  };

  const handleSave = (isChanged: boolean) => {
    fetch();
    setEditingStory(null);
    if (isChanged) {
      toast.success("Story updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingStory(null);
  };

  const handleDelete = async (id: string) => {
    const url = `/stories/delete/${id}/`
    try {
      await customRequest.delete(url);
      fetch();
      toast.success("Story deleted successfully");
    } catch (err) {
      console.error("Error deleting device", err);
    }
  };

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
    <div className="bg-white text-gray-900 p-6 pb-[13rem]">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900">
          </div>
        </div>
      ) : isWriter ? (
        stories.length < 1 ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center mb-8">
              <p className="text-2xl text-blue-600 font-bold mb-7">You haven&apos;t any write story yet</p>
              <Link href="/uploadStory" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" > Start writing</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-8 ">
              <a href="/uploadStory" className="text-lg text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600">
                write more story
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <div key={story.id} className="bg-gray-100 rounded-lg shadow-md p-6">
                  {editingStory && editingStory.id === story.id ? (
                    <EditStory
                      key={story.id}
                      story={editingStory}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900">{story.name}</h2>
                      <p className="text-gray-700 mb-4">
                        {story.story.length > 100 ? story.story.substring(0, 200) + "..." : story.story}
                        {story.story.length > 100 && <Link href={`/stories/story/${story.id}`} className="text-green-500">Read more</Link>}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                          onClick={() => handleEdit(story)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                          onClick={() => handleDelete(story.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center mb-8">
            <p className="text-2xl text-blue-600 font-bold">You must be a writer to view stories</p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={handleRegisterAsWriter}>Register as a writer</button>
          </div>
        </div>
      )
      }
    </div>

  );
};

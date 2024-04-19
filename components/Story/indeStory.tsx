"use client";

import React, { useState, useEffect } from "react";
import { EditStory } from "./editStory";
import { toast } from "react-toastify";
import { Story } from "../interface";
import { AxiosRequests } from "../utils/axiosRequests";
import { useRouter } from "next/navigation";
import Link from "next/link";


export const ShowIndeStory = () => {
  const router = useRouter();
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
    } catch (err) {
      setLoading(false);
      console.log("Error while fetching IndeStory at indeStory page", err);
      toast.error("You must Sign in first")
      router.push('/signin');
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

  return (
    <div className="bg-white text-gray-900 p-6">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900">
          </div>
        </div>
      ) : (
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
      )}
    </div>

  );
};

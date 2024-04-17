"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditStory } from "./editStory";
import { toast } from "react-toastify";
import { Story } from "../interface";
import { AxiosRequests } from "../utils/axiosRequests";

export const ShowIndeStory = () => {
  const customRequest = AxiosRequests();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const fetch = async () => {
    const url = `/stories/show_inde_story/`
    const response = await customRequest.get(url);
    setStories(response.data);
  };

  useEffect(() => {
    const fetchStories = async () => {
      fetch();
    };
    fetchStories();
  }, []);

  const handleEdit = (story : Story) => {
    setEditingStory(story);
  };

  const handleSave = (isChanged : boolean) => { 
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
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h2 className='mb-14 text-2xl text-red-600'>Page is under construction....</h2>
      <div>
        {stories.map((story) => (
          <div key={story.id}>
            {editingStory && editingStory.id === story.id ? (
              <EditStory
                key={story.id}
                story={editingStory}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <h2 className="text-3xl">{story.name}</h2>
                <p>Description: {story.story}</p>
                <div className="text-white flex gap-2">
                  <button
                    className="bg-blue-500 px-4 py-1"
                    onClick={() => {
                      handleEdit(story);
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                  <button
                    className="bg-red-400 px-4 py-1"
                    onClick={() => {
                      handleDelete(story.id);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

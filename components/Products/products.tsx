"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditProduct } from "./editProduct";
import { toast } from "react-toastify";
import { Story } from "../interface";

export const ShowProducts = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const fetch = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/company/show_story/");
    setStories(response.data);
    console.log('the response is: ' , response)
  };

  useEffect(() => {
    const fetchProducts = async () => {
      fetch();
    };
    fetchProducts();
  }, []);

  const handleEdit = (prod: Story) => {
    setEditingStory(prod);
  };

  const handleSave = (newProd: Story) => {
    fetch();
    const isChanged =
      newProd.id === editingStory?.id &&
      newProd.name === editingStory?.name &&
      newProd.story === editingStory?.story &&
    setEditingStory(null);
    if (!isChanged) {
      toast.success("Device updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingStory(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/prod/del/${id}`);
      fetch();
      toast.success("Device deleted successfully");
    } catch (err) {
      console.error("Error deleting device", err);
    }
  };

  return (
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h1 className="text-center"> Products </h1>
      <div>
        {stories.map((story) => (
          <div key={story.id}>
            {editingStory && editingStory.id === story.id ? (
              <EditProduct
                key={story.id}
                product={editingStory}
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

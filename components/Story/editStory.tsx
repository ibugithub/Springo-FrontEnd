
import { useState } from "react";
import axios from "axios";
import { EditStoryProps } from "../interface";
import { BaseUrl } from "../utils/baseUrl";
import { AxiosRequests } from "../utils/axiosRequests";


export const EditStory = ({ story, onSave, onCancel }: EditStoryProps) => {
  const customRequest = AxiosRequests();
  const [editedStory, setEditedStory] = useState({
    id: story.id,
    name: story.name,
    story: story.story,
  })
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedStory.name) {
      setError("You must provide a name");
      return;
    }
    if (!editedStory.story) {
      setError("You must provide your story");
      return;
    }
    const isChanged = story.name !== editedStory.name || story.story !== editedStory.story;

    if (isChanged) {
      try {
        const url = `/stories/update/${editedStory.id}/`
        const response = await customRequest.put(url, editedStory, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          onSave(isChanged);
        }

      } catch (err) {
        console.error("Error updating product", err);
      }
    } else {
      onSave(isChanged);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedStory({ ...editedStory, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="py-5 px-6 bg-white rounded-lg shadow-md">
        <span className="text-red-500 block mb-2">{error}</span>
        <input
          type="text"
          name="name"
          value={editedStory.name}
          placeholder="Product"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-2 resize-none"
          cols={20}
          rows={6}
          name="story"
          value={editedStory.story}
          placeholder="Description"
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
  
}

import { useState } from "react";
import axios from "axios";
import { EditStoryProps } from "../interface";
import { BaseUrl } from "../utils/baseUrl";


export const EditStory = ({ story, onSave, onCancel }: EditStoryProps) => {
  const [editedStory, setEditedStory] = useState({
    id: story.id,
    name: story.name,
    story: story.story,
  })
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BaseUrl}/api/stories/edit/${editedStory.id}`
      const response = await axios.put(url, editedStory, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSave(response.data.product );
    } catch (err) {
      console.error("Error updating product", err);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedStory({ ...editedStory, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="py-5 flex flex-col gap-2 w-[250px] items-start">
        <span className="text-red-500">{error}</span>
        <input type="text" name="name" value={editedStory.name} placeholder="Product" onChange={handleChange} />
        <textarea cols={20} rows={2} name="story" value={editedStory.story} placeholder="Description" onChange={handleChange} />
        <div className="flex gap-2">
          <button className="bg-blue-300 py-1 px-3" type="submit">Save</button>
          <button className="bg-red-300 py-1 px-3" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}
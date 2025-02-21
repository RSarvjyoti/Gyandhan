import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.description || !post.priority || !post.dueDate) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post(
        "https://gyandhan.onrender.com/api/task/create",
        post
      );

      toast.success("Task created successfully!");
      setPost({ title: "", description: "", priority: "", dueDate: "" });
    } catch (error) {
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <Toaster /> {/* This will render toast notifications */}
      <h2 className="text-xl font-bold mb-4 text-center">Create New Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Enter task title..."
          value={post.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Write task description..."
          value={post.description}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24"
        ></textarea>

        <select
          name="priority"
          value={post.priority}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={post.dueDate}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
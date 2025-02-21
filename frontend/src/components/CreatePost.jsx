import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.description || !post.priority || !post.dueDate) {
      setMessage({ text: "All fields are required!", type: "error" });
      return;
    }

    try {
      const response = await axios.post(
        "https://gyandhan.onrender.com/api/task/create",
        post
      );

      setMessage({ text: "Task created successfully!", type: "success" });
      setPost({ title: "", description: "", priority: "", dueDate: "" });
    } catch (error) {
      setMessage({ text: "Failed to create task.", type: "error" });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Task</h2>
      
      {message && (
        <div
          className={`text-center p-2 mb-3 rounded ${
            message.type === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

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
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const BASE_API = 'https://gyandhan.onrender.com/api/task';

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_API}/read`);
      setTasks(response.data.task);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setFormData({ title: task.title, description: task.description });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_API}/update/${editingTask}`, formData);
      toast.success('Task updated successfully!');
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error('Error updating task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_API}/delete/${id}`);
      toast.success('Task deleted successfully!');
      fetchTasks();
    } catch (err) {
      toast.error('Error deleting task');
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    
    const sortedTasks = [...tasks].sort((a, b) => {
      if (order === 'asc') {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <div className="mb-4">
        <button onClick={() => handleSort('title')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Sort by Title ({sortOrder})
        </button>
        <button onClick={() => handleSort('description')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Sort by Description ({sortOrder})
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="p-4 border rounded-lg flex justify-between items-center bg-gray-100">
                {editingTask === task._id ? (
                  <form onSubmit={updateTask} className="flex flex-col space-y-2">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="p-2 border rounded-lg"
                    />
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Save
                    </button>
                    <button onClick={() => setEditingTask(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShowTask;
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5"; // Back Icon
import axios from "axios";
import { IoMdCheckmark } from "react-icons/io"; // Add Task Icon

interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams(); // { id: 'some-task-id' }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("blue");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Color options
  const colorOptions = [
    "#FF3B30",
    "#FFCC00",
    "#34C759",
    "#007AFF",
    "#5856D6",
    "#AF52DE",
    "#FF2D55",
    "#A2845E",
  ];

  // 1) Fetch all tasks, find the one we want
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks.");
        setLoading(false);
      });
  }, []);

  // 2) Once tasks are loaded, find the matching one & set local state
  useEffect(() => {
    if (!loading) {
      const taskToEdit = tasks.find((t) => t.id === params.id);
      if (!taskToEdit) {
        setError("Task not found.");
      } else {
        setTitle(taskToEdit.title);
        setColor(taskToEdit.color);
      }
    }
  }, [loading, tasks, params.id]);

  // 3) Handle Update
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/tasks/${params.id}`, {
        title,
        color,
      });
      router.push("/"); // Go back to home
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    }
  }

  if (loading) {
    return <div className="p-4">Loading tasks...</div>;
  }

  return (
    <div className=" absolute top-1/4 flex flex-col items-center justify-center h-1/2 w-full max-w-3xl">
      {/* Error display */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>
      )}
      <button onClick={() => router.push("/")} className="self-start mb-4">
        <IoArrowBack size={24} className="text-gray-400 hover:text-white" />
      </button>
      <form
        onSubmit={handleUpdate}
        className="w-full  p-6 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label className="block font-medium text-[#4EA8DE] mb-2">Title</label>
          <input
            type="text"
            className="p-3 border border-[#333333] bg-[#262626] rounded w-full text-white placeholder-gray-500 focus:ring-2 focus:ring-[#4EA8DE]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-[#4EA8DE] mb-2">Color</label>
          <div className="flex gap-4">
            {colorOptions.map((c) => (
              <button
                key={c}
                type="button"
                className={`w-10 h-10 rounded-full border-4 ${
                  color === c ? "border-white" : "border-transparent"
                } hover:scale-110 transition`}
                style={{ backgroundColor: c }}
                onClick={() => {
                  setColor(c);
                  console.log(`Color Chosen: ${c}`);
                }}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center gap-4 justify-center p-3 bg-[#1E6F9F] text-white font-medium rounded-lg hover:bg-[#155a7c] transition text-lg shadow-md"
        >
          Save
          <IoMdCheckmark />
        </button>
      </form>
    </div>
  );
}

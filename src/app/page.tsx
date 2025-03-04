"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiClipboard } from "react-icons/fi"; // Import icon for empty state
import { IoMdAddCircleOutline } from "react-icons/io"; // Import icon for button
import { IoTrashOutline, IoCheckmarkCircle } from "react-icons/io5"; // Import trash icon
import TaskList from "@/components/TaskList";

interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

// Figma-based Color Map
const bgColorMap: Record<string, string> = {
  red: "bg-[#FF3B30]",
  orange: "bg-[#FF9500]",
  yellow: "bg-[#FFCC00]",
  green: "bg-[#34C759]",
  blue: "bg-[#007AFF]",
  indigo: "bg-[#5856D6]",
  purple: "bg-[#AF52DE]",
  pink: "bg-[#FF2D55]",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Function to toggle the task as completed or not
  const toggleCompleted = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  // Delete Task
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="absolute top-1/6 z-10 flex flex-col items-center w-full">
      {/* Create Task Button */}
      <Link
        href="/new"
        className="flex items-center justify-center w-full max-w-3xl px-6 py-3 bg-[#1E6F9F] text-white font-bold rounded-lg hover:bg-[#155a7c] transition text-lg mb-6"
      >
        <IoMdAddCircleOutline size={20} className="mr-2" />
        Create Task
      </Link>

      {/* Task Summary */}
      <div className="flex justify-between w-full max-w-3xl text-gray-300 mb-6">
        <div className="flex items-center gap-2">
          <p className="text-[#4EA8DE] text-sm font-semibold">
            Tasks{" "}
            <span className="bg-[#333333] text-white px-2 py-1 rounded-full text-xs">
              {totalTasks}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#8284FA] text-sm font-semibold">
            Completed{" "}
            <span className="bg-[#333333] text-white px-2 py-1 rounded-full text-xs">
              {completedTasks} of {totalTasks}
            </span>
          </p>
        </div>
      </div>

      {/* Empty State Message */}
      {totalTasks === 0 && (
        <div className="flex flex-col items-center text-gray-400 text-center space-y-2">
          <FiClipboard size={40} className="text-gray-500" />
          <p className="font-semibold">
            You don't have any tasks registered yet.
          </p>
          <p className="text-sm">Create tasks and organize your to-do items.</p>
        </div>
      )}

      {/* Task List Component */}
      <TaskList
        tasks={tasks}
        toggleCompleted={toggleCompleted}
        handleDelete={handleDelete}
      />
    </div>
  );
}

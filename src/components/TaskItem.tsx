// src/components/TaskItem.tsx
"use client";

import Link from "next/link";
import { IoTrashOutline, IoCheckmarkCircle } from "react-icons/io5";

interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

// Color Map (Ensure the same colors are used)
// Color Map (Updated to use hex codes as keys)
const bgColorMap: Record<string, string> = {
  "#FF3B30": "bg-[#FF3B30]", // Red
  "#FF9500": "bg-[#FF9500]", // Orange
  "#FFCC00": "bg-[#FFCC00]", // Yellow
  "#34C759": "bg-[#34C759]", // Green
  "#007AFF": "bg-[#007AFF]", // Blue
  "#5856D6": "bg-[#5856D6]", // Indigo
  "#AF52DE": "bg-[#AF52DE]", // Purple
  "#FF2D55": "bg-[#FF2D55]", // Pink
};

interface TaskItemProps {
  task: Task;
  toggleCompleted: (task: Task) => void;
  handleDelete: (id: string) => void;
}

export default function TaskItem({
  task,
  toggleCompleted,
  handleDelete,
}: TaskItemProps) {
  const bgColorClass = bgColorMap[task.color] || "bg-[#262626]"; // Apply color dynamically

  console.log("The requested Color: ", task);

  return (
    <li
      className={`p-5 rounded-lg flex items-center justify-between ${bgColorClass} border border-[#333333] shadow-md ${
        task.completed ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Checkbox with Background */}
      {task.completed ? (
        <IoCheckmarkCircle
          onClick={() => toggleCompleted(task)}
          className="w-7 h-7 cursor-pointer rounded-2xl text-[#8284FA]"
        />
      ) : (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task)}
          className="appearance-none w-6 h-6 text-[#1E6F9F] border-2 border-[#1E6F9F] cursor-pointer rounded-2xl"
        />
      )}

      {/* Task Title */}
      <div
        className={`flex-1 ml-4 text-lg ${
          task.completed ? "line-through text-gray-400" : "text-white"
        } font-medium`}
      >
        <Link href={`/${task.id}/edit`} className="hover:underline">
          {task.title}
        </Link>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(task.id)}
        className="text-gray-400 hover:text-white transition"
      >
        <IoTrashOutline size={20} />
      </button>
    </li>
  );
}

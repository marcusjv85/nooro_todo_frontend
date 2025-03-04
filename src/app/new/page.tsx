"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5"; // Back Icon
import { IoMdAddCircleOutline } from "react-icons/io"; // Add Task Icon

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FF3B30"); // Default color
  const [error, setError] = useState("");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      await axios.post("http://localhost:5000/tasks", { title, color });
      router.push("/");
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className=" absolute top-1/4 flex flex-col items-center justify-center h-1/2 w-full max-w-3xl">
      {/* Back Button */}
      <button onClick={() => router.push("/")} className="self-start mb-4">
        <IoArrowBack size={24} className="text-gray-400 hover:text-white" />
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#1A1A1A] p-6 rounded-lg shadow-lg "
      >
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Title Field */}
        <div className="mb-6">
          <label className="block font-medium text-[#4EA8DE] mb-2">Title</label>
          <input
            type="text"
            className="p-3 border border-[#333333] bg-[#262626] rounded w-full text-white placeholder-gray-500 focus:ring-2 focus:ring-[#4EA8DE]"
            placeholder="Ex. Brush your teeth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Color Picker */}
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
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center gap-4 justify-center p-3 bg-[#1E6F9F] text-white font-bold rounded-lg hover:bg-[#155a7c] transition text-lg shadow-md"
        >
          Add Task
          <IoMdAddCircleOutline size={20} className="mr-2" />
        </button>
      </form>
    </div>
  );
}

// src/components/TaskList.tsx
"use client";

import TaskItem from "./TaskItem";

interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleCompleted: (task: Task) => void;
  handleDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  toggleCompleted,
  handleDelete,
}: TaskListProps) {
  return (
    <div className="w-full max-w-3xl max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#4EA8DE] scrollbar-track-[#1A1A1A]">
      <ul className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleCompleted={toggleCompleted}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

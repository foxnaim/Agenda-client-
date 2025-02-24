"use client";

import React, { useState, useEffect } from "react";
import TaskCard from "@/app/components/Task/TaskCard";
import AddCard from "@/app/components/Task/AddCard";
import Navigation from "@/app/components/SideBar/Navigation";

interface Task {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: "В работе" | "Выполнено" | "Просрочено";
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: Omit<Task, "id" | "status">) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task, status: "В работе" }]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex flex-1 justify-center items-center w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 max-w-[1200px] mx-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} onUpdate={handleUpdateTask} />
          ))}
          <AddCard onAddTask={handleAddTask} />
        </div>
      </div>
    </div>
  );
};

export default Task;

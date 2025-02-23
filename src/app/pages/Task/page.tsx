"use client";

import React, { useState } from "react";
import TaskCard from "@/app/components/Task/TaskCard";
import AddCard from "@/app/components/Task/AddCard";
import Navigation from "@/app/components/SideBar/Navigation";

const Task: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Agenda Ai", category: "Стартап", startDate: "15.02.2025", endDate: "20.02.2025" },
    { id: 2, title: "Mobile dev", category: "Обучение", startDate: "15.12.2024", endDate: "25.12.2024" },
  ]);

  // Функция добавления задачи
  const handleAddTask = (task: { title: string; description: string; startDate: string; endDate: string }) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task, category: "Не указано" }]);
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex flex-1 justify-center items-center w-full px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-6 max-w-[1200px] mx-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
          <AddCard onAddTask={handleAddTask} />
        </div>
      </div>
    </div>
  );
};

export default Task;

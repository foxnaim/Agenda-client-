"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Navigation from "@/app/components/SideBar/Navigation";
import Link from "next/link";
import AddTask from "@/app/components/Task/AddTask";

interface Task {
  id: number;
  title: string;
}

export default function AgendaTask() {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, title: "Agenda Ai" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (title: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title }]);
  };

  return (
    <div className="flex h-screen bg-bgop">
      <div className="w-16 flex items-center">
        <Navigation />
      </div>

      {/* Центрирование */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex gap-6">
          {tasks.map((task) => (
            <Link
              href="/gib"
              key={task.id}
              className="w-40 h-40 bg-dop hover:bg-dopHover cursor-pointer duration-300 text-white p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-md"
            >
              <h2 className="font-bold">{task.title}</h2>
            </Link>
          ))}
          {/* Кнопка добавления */}
          <button
            className="w-40 h-40 border-2 border-[#897F68] rounded-xl flex items-center justify-center hover:bg-[#9C92781A] transition"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={40} color="#897F68" />
          </button>
        </div>
      </div>

      {/* Подключение модального окна */}
      {isModalOpen && <AddTask onAddTask={addTask} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

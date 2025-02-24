"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Navigation from "@/app/components/SideBar/Navigation";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function AgendaTask() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Agenda Ai", description: "Стартап", date: "15.02.2025" },
    { id: 2, title: "Mobile dev", description: "Обучение", date: "15.12.2024" },
  ]);

  return (
    <div className="flex h-screen bg-bgop">
      <div className="w-16 flex items-center">
        <Navigation />
      </div>

      {/* Центрирование и адаптив */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex grid-cols-auto-fit gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="w-40 h-40 bg-[#897F68] text-white p-4 rounded-xl flex flex-col justify-between shadow-md"
            >
              <div>
                <h2 className="font-bold">{task.title}</h2>
                <p className="text-sm text-gray-200">{task.description}</p>
              </div>
              <p className="text-sm font-semibold">{task.date}</p>
            </div>
          ))}
          <button className="w-40 h-40 border-2 border-[#897F68] rounded-xl flex items-center justify-center hover:bg-[#9C92781A] transition">
            <Plus size={40} color="#897F68" />
          </button>
        </div>
      </div>
    </div>
  );
}

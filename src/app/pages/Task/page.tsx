"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Navigation from "@/app/components/SideBar/Navigation";
import Link from "next/link";

interface Task {
  id: number;
  title: string;
}

export default function AgendaTask() {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, title: "Agenda Ai" }]);

  return (
    <div className="flex h-screen bg-bgop">
      <div className="w-16 flex items-center">
        <Navigation />
      </div>

      {/* Центрирование и адаптив */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex grid-cols-auto-fit gap-6  ">
          {tasks.map((task) => (
            <Link
              href="/gib"
              key={task.id}
              className="w-40 h-40 bg-dop hover:bg-dopHover cursor-pointer duration-300 text-white p-4 rounded-xl flex flex-col justify-between shadow-md"
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center h-full">
                <h2 className="font-bold">{task.title}</h2>
              </div>
            </Link>
          ))}
          <button className="w-40 h-40 border-2 border-[#897F68] rounded-xl flex items-center justify-center hover:bg-[#9C92781A] transition">
            <Plus size={40} color="#897F68" />
          </button>
        </div>
      </div>
    </div>
  );
}

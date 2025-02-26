"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type MonthlyTasks = {
  [month: string]: { name: string; tasks: Task[] };
};

const DashboardTask = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<MonthlyTasks>({});

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("monthlyTasks") || "{}");

    // Гарантируем, что у каждого месяца есть `tasks`
    const fixedTasks = Object.entries(savedTasks).reduce((acc, [month, data]) => {
      acc[month] = { name: (data as any).name || month, tasks: (data as any).tasks || [] };
      return acc;
    }, {} as MonthlyTasks);

    setTasks(fixedTasks);
  }, []);

  const toggleTask = (month: string, taskId: number) => {
    setTasks((prev) => {
      const updated = {
        ...prev,
        [month]: {
          ...prev[month],
          tasks: prev[month].tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">Обзор задач</h2>
      <button 
        onClick={() => router.push("/")} 
        className="mb-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
      >
        Назад
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([month, data]) => (
          <div key={month} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{data.name || month}</h3>
            {data.tasks && data.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(month, task.id)}
                  className="w-5 h-5"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTask;


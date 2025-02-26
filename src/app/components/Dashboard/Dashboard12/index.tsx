"use client";

import React, { useState, useEffect } from "react";
import DashboardOverview from "../DashboardTask"; // Импортируем обзор задач

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type MonthlyTasks = {
  [month: string]: { name: string; tasks: Task[] };
};

const MonthsDashboard = () => {
  const [tasks, setTasks] = useState<MonthlyTasks>({});
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [viewMode, setViewMode] = useState<"tasks" | "overview">("tasks");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("monthlyTasks") || "{}");
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (month: string) => {
    if (!newTask[month]?.trim()) return;
    setTasks((prev) => {
      const updated = {
        ...prev,
        [month]: {
          ...prev[month],
          tasks: [...(prev[month]?.tasks || []), { id: Date.now(), title: newTask[month], completed: false }],
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
    setNewTask((prev) => ({ ...prev, [month]: "" }));
  };

  const saveAndSwitchView = () => {
    localStorage.setItem("monthlyTasks", JSON.stringify(tasks));
    setViewMode("overview"); // Переключаемся на обзор
  };

  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  return (
    <div className="p-6 min-h-screen text-white">
      {viewMode === "tasks" ? (
        <>
          <h2 className="text-xl font-bold mb-4">План задач на год</h2>
          <button 
            onClick={saveAndSwitchView} 
            className="mb-4 px-6 py-3 bg-gray-500 rounded-lg hover:bg-gray-600 transition"
          >
            Сохранить и перейти к обзору
          </button>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {months.map((month) => (
              <div key={month} className="p-4 bg-dop rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">{tasks[month]?.name || month}</h3>

                <ul>
                  {tasks[month]?.tasks?.map((task) => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>

                <input
                  type="text"
                  value={newTask[month] || ""}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, [month]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask(month)}
                  placeholder="Добавить задачу..."
                  className="w-full p-2 bg-dop rounded border border-dop focus:outline-none"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <DashboardOverview tasks={tasks} setViewMode={setViewMode} />
      )}
    </div>
  );
};

export default MonthsDashboard;

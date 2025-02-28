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

const defaultMonths = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const MonthsDashboard = () => {
  const [tasks, setTasks] = useState<MonthlyTasks>(() =>
    defaultMonths.reduce((acc, month) => {
      acc[month] = { name: month, tasks: [] };
      return acc;
    }, {} as MonthlyTasks)
  );
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [viewMode, setViewMode] = useState<"tasks" | "overview">("tasks");
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editedMonthName, setEditedMonthName] = useState<string>("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("monthlyTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as MonthlyTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("monthlyTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (month: string) => {
    if (!newTask[month]?.trim()) return;

    setTasks((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        tasks: [...prev[month].tasks, { id: Date.now(), title: newTask[month], completed: false }],
      },
    }));

    setNewTask((prev) => ({ ...prev, [month]: "" }));
  };

  const deleteTask = (month: string, taskId: number) => {
    setTasks((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        tasks: prev[month].tasks.filter((task) => task.id !== taskId),
      },
    }));
  };

  const startEditingMonth = (month: string) => {
    setEditingMonth(month);
    setEditedMonthName(tasks[month].name);
  };

  const saveEditedMonth = () => {
    if (!editingMonth || !editedMonthName.trim()) return;

    setTasks((prev) => ({
      ...prev,
      [editingMonth]: { ...prev[editingMonth], name: editedMonthName.trim() },
    }));

    setEditingMonth(null);
  };

  return (
    <div className="p-6 min-h-screen text-white">
      {viewMode === "tasks" ? (
        <>
          <h2 className="flex justify-center text-xl font-bold mb-7">План задач на год</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(tasks).map(([month, data]) => (
              <div key={month} className="p-4 bg-dop rounded-lg shadow-md">
                {editingMonth === month ? (
                  <input
                    type="text"
                    value={editedMonthName}
                    onChange={(e) => setEditedMonthName(e.target.value)}
                    onBlur={saveEditedMonth}
                    onKeyDown={(e) => e.key === "Enter" && saveEditedMonth()}
                    className="text-lg font-bold mb-2 bg-transparent border-b border-white focus:outline-none w-full"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-bold mb-2 cursor-pointer"
                    onClick={() => startEditingMonth(month)}
                  >
                    {data.name}
                  </h3>
                )}

                <ul>
                  {data.tasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        disabled
                        className="w-5 h-5 cursor-not-allowed opacity-50"
                      />
                      <span className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </span>
                      <button
                        onClick={() => deleteTask(month, task.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        ✖
                      </button>
                    </li>
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
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => setViewMode("overview")}
              className="mb-4 px-6 py-3 bg-dopHover rounded-lg hover:bg-dop transition"
            >
              Перейти к обзору
            </button>
          </div>
        </>
      ) : (
        <DashboardOverview tasks={tasks} setTasks={setTasks} setViewMode={setViewMode} />
      )}
    </div>
  );
};

export default MonthsDashboard;

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
  const [tasks, setTasks] = useState<MonthlyTasks>({});
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [viewMode, setViewMode] = useState<"tasks" | "overview">("tasks");
  const [editingTask, setEditingTask] = useState<{ month: string; id: number } | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editedMonthName, setEditedMonthName] = useState<string>("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("monthlyTasks") || "{}");
    const initializedTasks = defaultMonths.reduce((acc, month) => {
      acc[month] = savedTasks[month] || { name: month, tasks: [] };
      return acc;
    }, {} as MonthlyTasks);
    setTasks(initializedTasks);
  }, []);

  const handleAddTask = (month: string) => {
    if (!newTask[month]?.trim()) return;
    setTasks((prev) => {
      const updated = {
        ...prev,
        [month]: {
          ...prev[month],
          tasks: [...prev[month]?.tasks || [], { id: Date.now(), title: newTask[month], completed: false }],
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
    setNewTask((prev) => ({ ...prev, [month]: "" }));
  };

  const toggleTaskCompletion = (month: string, taskId: number) => {
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

  const deleteTask = (month: string, taskId: number) => {
    setTasks((prev) => {
      const updated = {
        ...prev,
        [month]: {
          ...prev[month],
          tasks: prev[month].tasks.filter((task) => task.id !== taskId),
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
  };

  const startEditing = (month: string, taskId: number, title: string) => {
    setEditingTask({ month, id: taskId });
    setEditedTitle(title);
  };

  const saveEditedTask = () => {
    if (!editingTask) return;
    setTasks((prev) => {
      const updated = {
        ...prev,
        [editingTask.month]: {
          ...prev[editingTask.month],
          tasks: prev[editingTask.month].tasks.map((task) =>
            task.id === editingTask.id ? { ...task, title: editedTitle } : task
          ),
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
    setEditingTask(null);
  };

  const startEditingMonth = (month: string) => {
    setEditingMonth(month);
    setEditedMonthName(tasks[month]?.name || month);
  };

  const saveEditedMonth = (oldMonth: string) => {
    setTasks((prev) => {
      const updated = { ...prev };
      updated[editedMonthName] = { ...prev[oldMonth], name: editedMonthName };
      if (oldMonth !== editedMonthName) delete updated[oldMonth];
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
    setEditingMonth(null);
  };

  const saveAndSwitchView = () => {
    localStorage.setItem("monthlyTasks", JSON.stringify(tasks));
    setViewMode("overview"); // Переключаемся на обзор
  };

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
            {Object.keys(tasks).map((month) => (
              <div key={month} className="p-4 bg-dop rounded-lg shadow-md">
                {editingMonth === month ? (
                  <input
                    type="text"
                    value={editedMonthName}
                    onChange={(e) => setEditedMonthName(e.target.value)}
                    onBlur={() => saveEditedMonth(month)}
                    onKeyDown={(e) => e.key === "Enter" && saveEditedMonth(month)}
                    autoFocus
                    className="w-full p-1 bg-gray-800 rounded border border-gray-600 focus:outline-none"
                  />
                ) : (
                  <h3
                    className="text-lg font-bold mb-2 cursor-pointer"
                    onClick={() => startEditingMonth(month)}
                  >
                    {tasks[month]?.name || month}
                  </h3>
                )}

                <ul>
                  {tasks[month]?.tasks?.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(month, task.id)}
                        className="w-5 h-5"
                      />

                      {editingTask?.id === task.id && editingTask.month === month ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          onBlur={saveEditedTask}
                          onKeyDown={(e) => e.key === "Enter" && saveEditedTask()}
                          autoFocus
                          className="w-full p-1 bg-gray-800 rounded border border-gray-600 focus:outline-none"
                        />
                      ) : (
                        <span
                          onClick={() => startEditing(month, task.id, task.title)}
                          className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                        >
                          {task.title}
                        </span>
                      )}

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
        </>
      ) : (
        <DashboardOverview tasks={tasks} setViewMode={setViewMode} />
      )}
    </div>
  );
};

export default MonthsDashboard;

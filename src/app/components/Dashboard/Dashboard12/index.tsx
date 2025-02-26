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

const MonthsDashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<MonthlyTasks>({});
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [newMonthName, setNewMonthName] = useState<string>("");
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [editingTask, setEditingTask] = useState<{ month: string; id: number } | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("monthlyTasks") || "{}");
    setTasks(savedTasks);
  }, []);

  const handleMonthNameChange = (month: string) => {
    if (!newMonthName.trim()) return;
    setTasks((prev) => {
      const updated = { ...prev, [month]: { ...prev[month], name: newMonthName } };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });
    setEditingMonth(null);
  };

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

  const handleEditTask = (month: string, taskId: number, title: string) => {
    setEditingTask({ month, id: taskId });
    setEditedTaskTitle(title);
  };

  const saveEditedTask = () => {
    if (!editingTask) return;
    const { month, id } = editingTask;

    setTasks((prev) => {
      const updatedTasks = prev[month].tasks
        .map((task) => (task.id === id ? { ...task, title: editedTaskTitle.trim() } : task))
        .filter((task) => task.title !== ""); // Удаление пустых задач

      const updated = {
        ...prev,
        [month]: {
          ...prev[month],
          tasks: updatedTasks,
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updated));
      return updated;
    });

    setEditingTask(null);
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

  const saveAndGo = () => {
    localStorage.setItem("monthlyTasks", JSON.stringify(tasks));
    router.push("/DashboardTask");
  };

  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  return (
    <div className="p-6  min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">План задач на год</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {months.map((month) => (
          <div key={month} className="p-4 bg-dop rounded-lg shadow-md">
            {editingMonth === month ? (
              <input
                type="text"
                value={newMonthName}
                onChange={(e) => setNewMonthName(e.target.value)}
                onBlur={() => handleMonthNameChange(month)}
                onKeyDown={(e) => e.key === "Enter" && handleMonthNameChange(month)}
                autoFocus
                className="w-full p-2 bg-dop rounded border border-gray-600 focus:outline-none"
              />
            ) : (
              <h3
                className="text-lg font-bold mb-2 cursor-pointer"
                onClick={() => {
                  setEditingMonth(month);
                  setNewMonthName(tasks[month]?.name || month);
                }}
              >
                {tasks[month]?.name || month}
              </h3>
            )}

            <div className="space-y-2">
              {tasks[month]?.tasks?.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(month, task.id)}
                    className="w-5 h-5"
                  />
                  {editingTask?.month === month && editingTask.id === task.id ? (
                    <input
                      type="text"
                      value={editedTaskTitle}
                      onChange={(e) => setEditedTaskTitle(e.target.value)}
                      onBlur={saveEditedTask}
                      onKeyDown={(e) => e.key === "Enter" && saveEditedTask()}
                      autoFocus
                      className="w-full p-1 bg-gray-700 rounded border border-gray-600 focus:outline-none"
                    />
                  ) : (
                    <span
                      className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                      onClick={() => handleEditTask(month, task.id, task.title)}
                    >
                      {task.title}
                    </span>
                  )}
                  <button
                    onClick={() => deleteTask(month, task.id)}
                    className="ml-auto text-red-400 hover:text-red-600"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <input
                type="text"
                value={newTask[month] || ""}
                onChange={(e) => setNewTask((prev) => ({ ...prev, [month]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask(month)}
                placeholder="Добавить задачу..."
                className="w-full p-2 bg-dop rounded border border-dop focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={saveAndGo} 
        className="mt-6 px-6 py-3 bg-gray-500 rounded-lg hover:bg-gray-600 transition"
      >
        Сохранить и перейти
      </button>
    </div>
  );
};

export default MonthsDashboard;

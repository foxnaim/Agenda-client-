"use client";

import React, { useState, useEffect } from "react";
import DashboardOverview from "../DashboardTask";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskLists = {
  [key: string]: { name: string; tasks: Task[] };
};

const MonthsDashboard = () => {
  const [tasks, setTasks] = useState<TaskLists>({});
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("taskLists");
      setTasks(savedTasks ? JSON.parse(savedTasks) : {});
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("taskLists", JSON.stringify(tasks));
    }
  }, [tasks]);

  const deleteList = (listId: string) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      delete newTasks[listId];
      return { ...newTasks };
    });
    setMenuOpen(null);
  };

  const deleteTask = (listId: string, taskId: string) => {
    setTasks((prev) => ({
      ...prev,
      [listId]: {
        ...prev[listId],
        tasks: prev[listId].tasks.filter((task) => task.id !== taskId),
      },
    }));
  };

  const editTask = (listId: string, taskId: string) => {
    const task = tasks[listId]?.tasks.find((task) => task.id === taskId);
    if (task) {
      const newTitle = prompt("Редактировать задачу:", task.title);
      if (newTitle !== null && newTitle.trim() !== "") {
        setTasks((prev) => ({
          ...prev,
          [listId]: {
            ...prev[listId],
            tasks: prev[listId].tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)),
          },
        }));
      }
    }
  };

  const editListName = (listId: string) => {
    const newName = prompt("Введите новое название списка:", tasks[listId].name);
    if (newName && newName.trim() !== "") {
      setTasks((prev) => ({
        ...prev,
        [listId]: { ...prev[listId], name: newName },
      }));
    }
  };

  const closeMenus = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".menu")) {
      setMenuOpen(null);
    }
  };

  return (
    <div className="p-6 min-h-screen text-white" onClick={closeMenus}>
      <h2 className="flex justify-center text-xl md:text-2xl lg:text-3xl font-bold mb-7">План задач</h2>
      {isClient && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(tasks).map(([listId, data]) => (
            <motion.div
              key={listId}
              className="relative p-4 bg-dop rounded-lg shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold">{data.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(listId);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ⋮
                </button>
                {menuOpen === listId && (
                  <div className="absolute right-2 top-8 bg-gray-800 p-2 rounded shadow-lg z-10 flex flex-col menu">
                    <button onClick={() => editListName(listId)} className="text-blue-400 hover:bg-gray-700 p-1 rounded">Редактировать название</button>
                    <button onClick={() => deleteList(listId)} className="text-red-400 hover:bg-gray-700 p-1 rounded">Удалить лист</button>
                    <button onClick={() => deleteTask(listId, data.tasks[0]?.id)} className="text-yellow-400 hover:bg-gray-700 p-1 rounded">Удалить задачу</button>
                    <button onClick={() => editTask(listId, data.tasks[0]?.id)} className="text-green-400 hover:bg-gray-700 p-1 rounded">Редактировать задачу</button>
                  </div>
                )}
              </div>
              <ul>
                {data.tasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-2">
                    {task.title}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={newTask[listId] || ""}
                onChange={(e) => setNewTask((prev) => ({ ...prev, [listId]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTask[listId]) {
                    setTasks((prev) => ({
                      ...prev,
                      [listId]: {
                        ...prev[listId],
                        tasks: [...prev[listId].tasks, { id: uuidv4(), title: newTask[listId], completed: false }],
                      },
                    }));
                    setNewTask((prev) => ({ ...prev, [listId]: "" }));
                  }
                }}
                placeholder="Добавить задачу..."
                className="w-full p-2 bg-dop rounded focus:outline-none text-sm md:text-base"
              />
            </motion.div>
          ))}
          <motion.button onClick={() => {
            const newListId = uuidv4();
            const newListName = `TODO LIST ${Object.keys(tasks).length + 1}`;
            setTasks((prev) => ({ ...prev, [newListId]: { name: newListName, tasks: [] } }));
          }} className="p-4 bg-dop rounded-lg shadow-md hover:bg-dopHover border-dashed border-2 border-dopHover flex justify-center items-center text-sm md:text-base">➕ Добавить лист</motion.button>
        </div>
      )}
      <DashboardOverview tasks={tasks} setTasks={setTasks} setViewMode={() => {}} />
    </div>
  );
};

export default MonthsDashboard;
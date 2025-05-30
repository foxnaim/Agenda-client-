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
            tasks: prev[listId].tasks.map((t) =>
              t.id === taskId ? { ...t, title: newTitle } : t
            ),
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
    <div className="p-6 min-h-screen  text-royalAubergine" onClick={closeMenus}>
      <h2 className="flex justify-center text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 text-deepViolet">План задач</h2>
      {isClient && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tasks).map(([listId, data]) => (
            <motion.div
              key={listId}
              className="relative p-6 bg-softLavender rounded-xl shadow-lg border border-pastelPlum hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-deepViolet">{data.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(listId);
                  }}
                  className="text-pastelPlum hover:text-white transition-colors duration-200"
                >
                  ⋮
                </button>
                {menuOpen === listId && (
                  <div className="absolute right-2 top-10 bg-pastelPlum p-2 rounded-lg shadow-lg z-20 flex flex-col menu">
                    <button onClick={() => editListName(listId)} className="text-royalAubergine hover:bg-deepViolet p-1 rounded transition-colors duration-200">Редактировать название</button>
                    <button onClick={() => deleteList(listId)} className="text-deepViolet hover:bg-deepViolet p-1 rounded transition-colors duration-200">Удалить лист</button>
                    {data.tasks.length > 0 && (
                      <>
                        <button onClick={() => deleteTask(listId, data.tasks[0].id)} className="text-softLavender hover:bg-deepViolet p-1 rounded transition-colors duration-200">Удалить задачу</button>
                        <button onClick={() => editTask(listId, data.tasks[0].id)} className="text-pastelPlum hover:bg-deepViolet p-1 rounded transition-colors duration-200">Редактировать задачу</button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <ul className="mb-4 space-y-2">
                {data.tasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-2 p-2 bg-softLavender rounded hover:bg-pastelPlum transition-colors duration-200 text-deepViolet">
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
                        tasks: [
                          ...prev[listId].tasks,
                          { id: uuidv4(), title: newTask[listId], completed: false }
                        ],
                      },
                    }));
                    setNewTask((prev) => ({ ...prev, [listId]: "" }));
                  }
                }}
                placeholder="Добавить задачу..."
                className="w-full p-3 bg-softLavender rounded-lg focus:outline-none text-base text-deepViolet"
              />
            </motion.div>
          ))}
          <motion.button
            onClick={() => {
              const newListId = uuidv4();
              const newListName = `TODO LIST ${Object.keys(tasks).length + 1}`;
              setTasks((prev) => ({ ...prev, [newListId]: { name: newListName, tasks: [] } }));
            }}
            className="p-6 bg-softLavender rounded-xl shadow-lg hover:bg-pastelPlum border-dashed border-2 border-deepViolet flex justify-center items-center text-xl font-semibold transition-colors duration-300 text-deepViolet"
          >
            ➕ Добавить лист
          </motion.button>
        </div>
      )}
      <DashboardOverview tasks={tasks} setTasks={setTasks} setViewMode={() => {}} />
    </div>
  );
};

export default MonthsDashboard;

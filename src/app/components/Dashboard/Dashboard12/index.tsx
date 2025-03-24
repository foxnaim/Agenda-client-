"use client";

import React, { useState, useEffect } from "react";
import DashboardOverview from "../DashboardTask";
import { motion } from "framer-motion";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskLists = {
  [list: string]: { name: string; tasks: Task[] };
};

const MonthsDashboard = () => {
  const [tasks, setTasks] = useState<TaskLists>({});
  const [newTask, setNewTask] = useState<{ [key: string]: string }>({});
  const [editingTask, setEditingTask] = useState<{ [key: string]: number | null }>({});
  const [taskEditText, setTaskEditText] = useState<{ [key: number]: string }>({});
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [deleteMenuOpen, setDeleteMenuOpen] = useState<{ [key: string]: boolean }>({});

  // Загружаем задачи из localStorage при монтировании компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("taskLists");
      setTasks(savedTasks ? JSON.parse(savedTasks) : {});
    }
  }, []);

  // Сохраняем задачи в localStorage при каждом обновлении tasks
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("taskLists", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = (list: string) => {
    if (!newTask[list]?.trim()) return;

    setTasks((prev) => ({
      ...prev,
      [list]: {
        ...prev[list],
        tasks: [...prev[list].tasks, { id: Date.now(), title: newTask[list], completed: false }],
      },
    }));

    setNewTask((prev) => ({ ...prev, [list]: "" }));
  };

  const deleteTask = (list: string, taskId: number) => {
    setTasks((prev) => ({
      ...prev,
      [list]: {
        ...prev[list],
        tasks: prev[list].tasks.filter((task) => task.id !== taskId),
      },
    }));
    setDeleteMenuOpen({ ...deleteMenuOpen, [list]: false });
  };

  const startEditingTask = (list: string, taskId: number, title: string) => {
    setEditingTask({ ...editingTask, [list]: taskId });
    setTaskEditText({ ...taskEditText, [taskId]: title });
    setMenuOpen({ ...menuOpen, [list]: false });
  };

  const updateTask = (list: string, taskId: number) => {
    if (!taskEditText[taskId]?.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [list]: {
        ...prev[list],
        tasks: prev[list].tasks.map((task) =>
          task.id === taskId ? { ...task, title: taskEditText[taskId] } : task
        ),
      },
    }));
    setEditingTask({ ...editingTask, [list]: null });
  };

  const addList = () => {
    if (Object.keys(tasks).length >= 100) return;
    const newListName = `TODO LIST ${Object.keys(tasks).length + 1}`;
    setTasks((prev) => ({
      ...prev,
      [newListName]: { name: newListName, tasks: [] },
    }));
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="flex justify-center text-xl md:text-2xl lg:text-3xl font-bold mb-7">
        План задач
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([list, data]) => (
          <motion.div
            key={list}
            className="relative p-4 bg-dop rounded-lg shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() =>
                setMenuOpen({ ...menuOpen, [list]: !menuOpen[list] })
              }
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ⋮
            </button>
            {menuOpen[list] && (
              <div className="absolute top-8 right-2 bg-gray-700 shadow-md rounded-lg p-2 text-sm">
                <button
                  onClick={() =>
                    setDeleteMenuOpen({ ...deleteMenuOpen, [list]: true })
                  }
                  className="block w-full text-left px-2 py-1 hover:bg-gray-600"
                >
                  Удалить
                </button>
                <button
                  onClick={() =>
                    startEditingTask(
                      list,
                      data.tasks[0]?.id,
                      data.tasks[0]?.title
                    )
                  }
                  className="block w-full text-left px-2 py-1 hover:bg-gray-600"
                >
                  Редактировать
                </button>
              </div>
            )}
            {deleteMenuOpen[list] && (
              <div className="absolute top-12 right-2 bg-gray-700 shadow-md rounded-lg p-2 text-sm">
                {data.tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => deleteTask(list, task.id)}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-600"
                  >
                    Удалить {task.title}
                  </button>
                ))}
              </div>
            )}
            <h3 className="text-lg md:text-xl font-bold mb-2">{data.name}</h3>
            <ul>
              {data.tasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2">
                  {editingTask[list] === task.id ? (
                    <input
                      type="text"
                      value={taskEditText[task.id] || ""}
                      onChange={(e) =>
                        setTaskEditText({
                          ...taskEditText,
                          [task.id]: e.target.value,
                        })
                      }
                      onBlur={() => updateTask(list, task.id)}
                      className="w-full p-1 bg-dop rounded focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="cursor-pointer text-sm md:text-base"
                      onClick={() =>
                        startEditingTask(list, task.id, task.title)
                      }
                    >
                      {task.title}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newTask[list] || ""}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, [list]: e.target.value }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleAddTask(list)}
              placeholder="Добавить задачу..."
              className="w-full p-2 bg-dop rounded focus:outline-none text-sm md:text-base"
            />
          </motion.div>
        ))}
        <motion.button
          onClick={addList}
          className="p-4 bg-dop rounded-lg shadow-md hover:bg-dopHover border-dashed border-2 border-dopHover flex justify-center items-center text-sm md:text-base"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          ➕ Добавить лист
        </motion.button>
      </div>
      <DashboardOverview
        tasks={tasks}
        setTasks={setTasks}
        setViewMode={() => {}}
      />
    </div>
  );
};

export default MonthsDashboard;

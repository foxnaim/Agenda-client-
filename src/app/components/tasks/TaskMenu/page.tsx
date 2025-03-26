"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import AddTask from "@/app/components/tasks/AddTask";

interface Task {
  id: string;
  title: string;
}

export default function AgendaTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Ошибка загрузки задач из localStorage", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    const syncTasks = (event: StorageEvent) => {
      if (event.key === "tasks") {
        setTasks(JSON.parse(event.newValue || "[]"));
      }
    };
    window.addEventListener("storage", syncTasks);
    return () => window.removeEventListener("storage", syncTasks);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (title: string) => {
    const newTask = { id: crypto.randomUUID(), title };
    saveTasks([...tasks, newTask]);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setEditValue(task.title);
  };

  const updateTask = () => {
    if (!editingTask || editingTask.title === editValue.trim()) return;

    if (editValue.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, title: editValue.trim() } : task
      );
      saveTasks(updatedTasks);
    }

    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      saveTasks(updatedTasks);
    }
  };

  // Анимации для карточек задач
  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-bgop p-6">
      <div className="flex-1 flex-col items-center justify-center">
        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              className="w-40 h-40 bg-dop hover:bg-dopHover cursor-pointer duration-300 text-white p-5 rounded-xl flex flex-col justify-center items-center text-center shadow-md relative"
              variants={taskVariants}
              onClick={() => {
                console.log("Navigating to:", `/tasks/${task.id}`);
                router.push(`/components/tasks/${task.id}`);
              }}
            >
              {editingTask?.id === task.id ? (
                <input
                  type="text"
                  value={editValue}
                  maxLength={30}
                  className="bg-transparent border-b border-white text-center focus:outline-none w-full"
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => {
                    if (editValue.trim()) {
                      updateTask();
                    } else {
                      setEditingTask(null);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && updateTask()}
                  autoFocus
                />
              ) : (
                <h2 className="font-bold break-words w-full">{task.title}</h2>
              )}

              {/* Кнопка меню */}
              <button
                className="absolute top-2 right-2 text-white hover:text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === task.id ? null : task.id);
                }}
              >
                <MoreVertical size={23} />
              </button>

              {/* Выпадающее меню */}
              {menuOpen === task.id && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 right-2 bg-gray-900 p-2 rounded-lg shadow-lg w-32"
                >
                  <button
                    className="flex items-center w-full text-white hover:text-blue-400 px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(task);
                      setMenuOpen(null);
                    }}
                  >
                    <Edit size={16} className="mr-2" /> Редактировать
                  </button>
                  <button
                    className="flex items-center w-full text-white hover:text-red-400 px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                      setMenuOpen(null);
                    }}
                  >
                    <Trash2 size={16} className="mr-2" /> Удалить
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}

          <motion.button
            className="w-40 h-40 border-2 border-dopHover rounded-xl flex items-center justify-center hover:bg-[#9C92781A] transition"
            onClick={() => setIsModalOpen(true)}
            variants={taskVariants}
          >
            <Plus size={40} color="#897F68" />
          </motion.button>
        </motion.div>
      </div>

      {isModalOpen && <AddTask onAddTask={addTask} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

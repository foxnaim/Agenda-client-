"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation"; // ⬅️ Добавляем для навигации
import Navigation from "@/app/components/SideBar/Navigation";
import AddTask from "@/app/components/Task/AddTask";

interface Task {
  id: number;
  title: string;
}

export default function AgendaTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const router = useRouter(); // ⬅️ Добавляем useRouter

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (title: string) => {
    const newTask = { id: Date.now(), title };
    saveTasks([...tasks, newTask]);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setEditValue(task.title);
  };

  const updateTask = () => {
    if (editingTask && editValue.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, title: editValue } : task
      );
      saveTasks(updatedTasks);
    }
    setEditingTask(null);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
  };

  return (
    <div className="flex h-screen bg-bgop">
      <div className="w-16 flex items-center">
        <Navigation />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="w-40 h-40 bg-dop hover:bg-dopHover cursor-pointer duration-300 text-white p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-md relative"
              onClick={() => router.push(`/tasks/${task.id}`)} // ⬅️ Переход на TaskPage
            >
              {editingTask?.id === task.id ? (
                <input
                  type="text"
                  value={editValue}
                  maxLength={30}
                  className="bg-transparent border-b border-white text-center focus:outline-none w-full"
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={updateTask}
                  onKeyDown={(e) => e.key === "Enter" && updateTask()}
                  autoFocus
                />
              ) : (
                <h2 className="font-bold break-words w-full">{task.title}</h2>
              )}

              <div className="absolute bottom-2 right-2 flex gap-2">
                <button onClick={() => startEditing(task)} className="transition hover:text-gray-700">
                  <Edit size={20} className="text-white" />
                </button>
                <button onClick={() => deleteTask(task.id)} className="transition hover:text-gray-700">
                  <Trash2 size={20} className="text-white" />
                </button>
              </div>
            </div>
          ))}

          <button
            className="w-40 h-40 border-2 border-[#897F68] rounded-xl flex items-center justify-center hover:bg-[#9C92781A] transition"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={40} color="#897F68" />
          </button>
        </div>
      </div>

      {isModalOpen && <AddTask onAddTask={addTask} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ⬅️ Получаем taskId из URL
import TaskCard from "../TaskCard";
import AddCard from "../AddCard";
import Navigation from "../../SideBar/Navigation";

interface TaskType {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: "В работе" | "Выполнено" | "Просрочено";
  parentId?: number;
}

const TaskPage: React.FC = () => {
  const { taskId } = useParams(); // ⬅️ Достаем ID задачи
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [mainTask, setMainTask] = useState<string>("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedSubTasks = localStorage.getItem("subtasks");

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      const task = parsedTasks.find((t: { id: number }) => t.id === Number(taskId));
      if (task) setMainTask(task.title);
    }

    if (savedSubTasks) {
      setTasks(JSON.parse(savedSubTasks).filter((t: TaskType) => t.parentId === Number(taskId)));
    }
  }, [taskId]);

  useEffect(() => {
    localStorage.setItem("subtasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: Omit<TaskType, "id" | "status">) => {
    setTasks([...tasks, { id: Date.now(), ...task, parentId: Number(taskId), status: "В работе" }]);
  };

  const handleUpdateTask = (updatedTask: TaskType) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex flex-1 flex-col justify-center items-center w-full px-4">
        <h1 className="text-2xl font-bold mb-4">Подзадачи для: {mainTask}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 max-w-[1200px] mx-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
          <AddCard onAddTask={handleAddTask} />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;

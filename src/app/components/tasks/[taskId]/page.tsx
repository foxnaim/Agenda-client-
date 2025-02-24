"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TaskCard from "@/app/components/tasks/TaskCard";
import AddCard from "@/app/components/tasks/AddCard";
import Navigation from "@/app/components/SideBar/Navigation";

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
  const { taskId } = useParams(); 
  const numericTaskId = Number(taskId); // ✅ Преобразуем строку в число
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [mainTask, setMainTask] = useState<string>("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedSubTasks = localStorage.getItem("subtasks");

    if (savedTasks) {
      const parsedTasks: TaskType[] = JSON.parse(savedTasks);
      const task = parsedTasks.find((t) => t.id === numericTaskId);
      if (task) setMainTask(task.title);
    }

    if (savedSubTasks) {
      setTasks(JSON.parse(savedSubTasks).filter((t: TaskType) => t.parentId === numericTaskId));
    }
  }, [numericTaskId]);

  const handleAddTask = (task: Omit<TaskType, "id" | "status">) => {
    const newTask: TaskType = {
      id: Date.now(),
      ...task,
      parentId: numericTaskId,
      status: "В работе",
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("subtasks", JSON.stringify(updatedTasks)); // ✅ Перенес сохранение
  };

  const handleUpdateTask = (updatedTask: TaskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    localStorage.setItem("subtasks", JSON.stringify(tasks)); // ✅ Сохраняем изменения
  };

  const handleDeleteTask = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить задачу?")) {
      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((task) => task.id !== id);
        localStorage.setItem("subtasks", JSON.stringify(filteredTasks)); // ✅ Сохранение после удаления
        return filteredTasks;
      });
    }
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

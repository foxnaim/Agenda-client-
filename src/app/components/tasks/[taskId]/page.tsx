"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const numericTaskId = Number(taskId); // Преобразуем строку в число
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
      setTasks(
        JSON.parse(savedSubTasks).filter(
          (t: TaskType) => t.parentId === numericTaskId
        )
      );
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
    localStorage.setItem("subtasks", JSON.stringify(updatedTasks));
  };

  const handleUpdateTask = (updatedTask: TaskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    localStorage.setItem("subtasks", JSON.stringify(tasks));
  };

  const handleDeleteTask = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить задачу?")) {
      setTasks((prevTasks) => {
        const filteredTasks = prevTasks.filter((task) => task.id !== id);
        localStorage.setItem("subtasks", JSON.stringify(filteredTasks));
        return filteredTasks;
      });
    }
  };

  // Анимации для контейнера задач
  const tasksContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // Анимации для задач
  const taskVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  // Анимация заголовка
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex flex-1 flex-col justify-center items-center w-full px-4">
        {/* Анимация заголовка */}
        <motion.h1
          className="text-2xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Подзадачи для: {mainTask}
        </motion.h1>

        {/* Контейнер задач */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 max-w-[1200px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={tasksContainerVariants}
        >
          {tasks.map((task) => (
            <motion.div key={task.id} variants={taskVariants}>
              <TaskCard
                {...task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            </motion.div>
          ))}

          <motion.div variants={taskVariants}>
            <AddCard onAddTask={handleAddTask} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskPage;

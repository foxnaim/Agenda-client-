"use client";

import React from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type MonthlyTasks = {
  [month: string]: { name: string; tasks: Task[] };
};

type Props = {
  tasks: MonthlyTasks;
  setViewMode: (mode: "tasks") => void;
};

const DashboardOverview: React.FC<Props> = ({ tasks, setViewMode }) => {
  const toggleTask = (month: string, taskId: number) => {
    const updated = {
      ...tasks,
      [month]: {
        ...tasks[month],
        tasks: tasks[month].tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      },
    };
    localStorage.setItem("monthlyTasks", JSON.stringify(updated));
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">Обзор задач</h2>

      <button 
        onClick={() => setViewMode("tasks")} 
        className="mb-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
      >
        Назад к редактированию
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([month, data]) => (
          <div key={month} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{data.name || month}</h3>
            {data.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(month, task.id)}
                  className="w-5 h-5"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;

"use client";

import React from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type MonthlyTasks = {
  [month: string]: { name: string; tasks: Task[] };
};

type Props = {
  tasks: MonthlyTasks;
  setTasks: React.Dispatch<React.SetStateAction<MonthlyTasks>>;
  setViewMode: (mode: "tasks") => void;
};

const DashboardOverview: React.FC<Props> = ({ tasks, setTasks }) => {
  const toggleTask = (month: string, taskId: string) => {
    setTasks((prev) => {
      const updatedTasks = {
        ...prev,
        [month]: {
          ...prev[month],
          tasks: prev[month].tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        },
      };
      localStorage.setItem("monthlyTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="flex justify-center items-center text-[#E2E8F0] p-4 mt-28">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-[#D0D3E0]">
          Обзор задач
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tasks)
            .filter(([_, data]) => data.tasks.length > 0)
            .map(([month, data]) => (
              <div key={month} className="p-5 bg-[#1E293B] rounded-lg shadow-lg border border-[#273444]">
                <h3 className="text-xl font-bold mb-3 text-center text-[#D0D3E0]">
                  {data.name || month}
                </h3>
                {data.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-2 bg-[#2C3A47] rounded hover:bg-[#374C5C] transition-colors duration-200">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(month, task.id)}
                      className="w-5 h-5 cursor-pointer accent-[#4FD1C5] transition-all duration-200"
                    />
                    <span className={task.completed ? "line-through text-gray-500" : "text-[#D0D3E0]"}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            ))}
        </div>

        {Object.values(tasks).every((month) => month.tasks.length === 0) && (
          <p className="text-center text-gray-300 mt-6">Нет добавленных задач</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;

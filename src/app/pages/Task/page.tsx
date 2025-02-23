import React from "react";
import TaskCard from "@/app/components/Task/TaskCard";
import AddCard from "@/app/components/Task/AddCard";
import Navigation from "@/app/components/SideBar/Navigation";

const projects = [
  { id: 1, title: "Agenda Ai", category: "Стартап", date: "15.02.2025" },
  { id: 2, title: "Mobile dev", category: "Обучение", date: "15.12.2024" },
];

const Task: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex flex-1 justify-center items-center w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-[90%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[60%]">
          {projects.map((project) => (
            <TaskCard key={project.id} {...project} />
          ))}
          <AddCard />
        </div>
      </div>
    </div>
  );
};

export default Task;

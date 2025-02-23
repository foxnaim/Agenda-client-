import React from "react";

interface AgendaCardProps {
  title: string;
  category: string;
  date: string;
}

const TaskCard: React.FC<AgendaCardProps> = ({ title, category, date }) => {
  return (
    <div className="w-[180px] h-[180px] bg-dop rounded-2xl flex flex-col justify-between p-4 shadow-md">
      <div>
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-white text-sm">{category}</p>
      </div>
      <p className="text-white text-sm font-semibold">{date}</p>
    </div>
  );
};

export default TaskCard;

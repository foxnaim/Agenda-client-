import React from "react";

interface AgendaCardProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
}

const TaskCard: React.FC<AgendaCardProps> = ({ title, category, startDate, endDate }) => {
  return (
    <div className="w-[220px] min-h-[180px] bg-dop rounded-2xl flex flex-col justify-between p-4 shadow-lg border border-gray-700">
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg break-words">{title}</h3>
        <p className="text-gray-400 text-sm">{category}</p>
      </div>
      <p className="text-gray-300 text-xs font-semibold">
        {startDate} — {endDate}
      </p>
    </div>
  );
};

export default TaskCard;

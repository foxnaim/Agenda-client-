import React from "react";

interface TaskCardProps {
  title: string;
  startDate: string;
  endDate: string;
  description?: string; // Добавляем описание
}

const TaskCard: React.FC<TaskCardProps> = ({ title, startDate, endDate, description }) => {
  return (
    <div className="w-[220px] min-h-[200px] bg-dop rounded-2xl flex flex-col justify-between p-4 shadow-lg border border-gray-700">
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg break-words">{title}</h3>
        {description && <p className="text-gray-400 text-xs mt-1">{description}</p>} 
      </div>
      <p className="text-gray-300 text-xs font-semibold">
        {startDate} - {endDate}
      </p>
    </div>
  );
};

export default TaskCard;

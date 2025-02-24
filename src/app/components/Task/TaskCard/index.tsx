"use client";

import React, { useState } from "react";

interface TaskCardProps {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  status: "В работе" | "Выполнено" | "Просрочено";
  onUpdate: (task: TaskCardProps) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, startDate, endDate, description, status, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description || "");
  
  const isExpired = new Date(endDate) < new Date() && status !== "Выполнено";

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveEdit = () => {
   onUpdate({ 
     id, 
     title: editedTitle,  
     startDate, 
     endDate, 
     description: editedDescription, 
     status 
   } as TaskCardProps);
   setIsEditing(false);
 };
 
 const toggleStatus = () => {
   onUpdate({ 
     id, 
     title,  
     startDate, 
     endDate, 
     description: editedDescription || "",  
     status: status === "В работе" ? "Выполнено" : "В работе"
   } as TaskCardProps);
 };
 


  return (
    <div className="w-[220px] min-h-[240px] bg-dop rounded-2xl flex flex-col justify-between p-4 shadow-lg border border-gray-700">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="p-1 bg-gray-800 text-white rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="p-1 bg-gray-800 text-white rounded"
          />
          <button className="px-2 py-1 bg-green-500 text-white rounded-md text-xs" onClick={saveEdit}>
            Сохранить
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-bold text-lg break-words">{title}</h3>
          {description && <p className="text-gray-400 text-xs mt-1">{description}</p>}
        </div>
      )}

      <p className="text-gray-300 text-xs font-semibold">
        {startDate} - {endDate}
      </p>

      <p className={`text-xs font-semibold mt-2 ${isExpired ? "text-red-500" : "text-green-500"}`}>
        {isExpired ? "Просрочено" : status}
      </p>

      <div className="flex gap-2 mt-2">
        <button className="px-2 py-1 bg-yellow-500 text-white rounded-md text-xs" onClick={toggleEdit}>
          {isEditing ? "Отмена" : "Редактировать"}
        </button>
        {!isEditing && (
          <button className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs" onClick={toggleStatus}>
            {status === "В работе" ? "Завершить" : "В работу"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

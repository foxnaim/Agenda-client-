"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface AddCardProps {
  onAddTask: (task: { title: string; description: string; date: string }) => void;
}

const AddCard: React.FC<AddCardProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleAddTask = () => {
    if (title.trim() && date) {
      onAddTask({ title, description, date });
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setDate("");
    }
  };

  return (
    <>
      {/* Кнопка для открытия модального окна */}
      <div
        className="w-[180px] h-[180px] border-2 border-[#9C9278] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#9C92781A] transition"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={40} color="#9C9278" />
      </div>

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-[320px] bg-[#2C2C2C] p-6 rounded-lg shadow-lg relative">
            {/* Кнопка закрытия */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-white text-lg font-semibold mb-4">Добавить задачу</h2>

            {/* Поля ввода */}
            <input
              type="text"
              placeholder="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-[#9C9278] rounded-md bg-transparent text-white mb-2"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-[#9C9278] rounded-md bg-transparent text-white mb-2"
            />
            <textarea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-[#9C9278] rounded-md bg-transparent text-white resize-none h-[80px] mb-4"
            />

            {/* Кнопки */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-[#9C9278] text-black rounded-md hover:bg-[#8B8060] transition"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCard;

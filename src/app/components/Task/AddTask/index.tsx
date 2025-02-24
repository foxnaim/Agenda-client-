"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface AddTaskProps {
  onAddTask: (title: string) => void;
  onClose: () => void;
}

export default function AddTask({ onAddTask, onClose }: AddTaskProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">Добавить задачу</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Название задачи"
            className="border p-2 rounded-lg"
            maxLength={30}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}

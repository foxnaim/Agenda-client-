"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface AddTaskProps {
  onAddTask: (title: string) => void;
  onClose: () => void;
}

export default function AddTask({ onAddTask, onClose }: AddTaskProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;
      onAddTask(title);
      setTitle("");
      onClose();
    },
    [title, onAddTask, onClose]
  );

  return (
    <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
        <motion.button className="absolute top-2 right-2" onClick={onClose}>
          <X size={20} />
        </motion.button>
        <h2 className="text-lg font-bold mb-4">Краткое описание</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Название (макс. 30 символов)"
            className="border p-2 rounded-lg"
            maxLength={30}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Добавить
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

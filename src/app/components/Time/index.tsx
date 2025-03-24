"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const day = time.toLocaleDateString("ru-RU", { weekday: "long" });

  // Анимации для времени
  const timeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Анимации для текста дня недели
  const dayVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center p-4 bg-dop text-white rounded-2xl shadow-lg w-[160px] h-[100px]"
        variants={timeVariants}
      >
        {/* Часы и минуты */}
        <div className="text-4xl font-bold flex gap-2">
          <span>{String(hours).padStart(2, "0")}:</span>
          <span>{String(minutes).padStart(2, "0")}</span>
          <span className="text-xl">{ampm}</span>
        </div>
        {/* День недели */}
        <motion.div
          className="text-lg text-gray-400 capitalize"
          initial="hidden"
          animate="visible"
          variants={dayVariants}
        >
          {day}
        </motion.div>
      </motion.div>
    </div>
  );
}

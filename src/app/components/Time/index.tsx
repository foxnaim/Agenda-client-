"use client";
import React, { useState, useEffect } from "react";

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

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-4 bg-dop text-white rounded-2xl shadow-lg w-[160px] h-[100px]">
        <div className="text-4xl font-bold flex gap-2">
          <span>{String(hours).padStart(2, "0")}:</span>
          <span>{String(minutes).padStart(2, "0")}</span>
          <span className="text-xl">{ampm}</span>
        </div>
        <div className="text-lg text-gray-400 capitalize">{day}</div>
      </div>
    </div>
  );
}

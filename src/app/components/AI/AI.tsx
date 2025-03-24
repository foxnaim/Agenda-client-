"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { LuListTodo, LuSend } from "react-icons/lu";
import { MdHandshake } from "react-icons/md";
import { FiPaperclip } from "react-icons/fi";

type Props = {};

const AI = (props: Props) => {
  // Анимации для контейнера
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Анимации для кнопок
  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: "#3B3B3B", transition: { duration: 0.2 } },
  };

  // Анимация для иконок
  const iconVariants = {
    hover: { scale: 1.2, color: "#CCCCCC", transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed bottom-0 left-0 w-full flex justify-center p-4"
    >
      <div className="w-full max-w-[700px] bg-dop p-4 rounded-2xl flex flex-col shadow-lg">
        {/* Текстовое поле с анимацией */}
        <motion.textarea
          className="w-full bg-transparent text-white resize-none outline-none placeholder-dopHover p-2"
          placeholder="Message Agenda..."
          rows={3}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Панель с кнопками */}
        <div className="mt-4 flex justify-between items-center">
          {/* Кнопки действий */}
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              className="flex items-center gap-2 text-white border border-dopHover px-3 py-2 sm:px-4 sm:py-2 rounded-3xl hover:bg-gray-700 transition"
              variants={buttonVariants}
              whileHover="hover"
            >
              <LuListTodo className="text-xl" /> 
              <span className="hidden sm:inline">Make a task</span>
            </motion.button>
            <motion.button
              className="flex items-center gap-2 text-white border border-dopHover px-3 py-2 sm:px-4 sm:py-2 rounded-3xl hover:bg-gray-700 transition"
              variants={buttonVariants}
              whileHover="hover"
            >
              <MdHandshake className="text-xl" /> 
              <span className="hidden sm:inline">Own meeting</span>
            </motion.button>
          </div>

          {/* Иконки с анимацией */}
          <div className="flex gap-2 sm:gap-3 text-white text-xl">
            <motion.div variants={iconVariants} whileHover="hover">
              <FiPaperclip className="cursor-pointer hover:text-gray-300 transition" />
            </motion.div>
            <motion.div variants={iconVariants} whileHover="hover">
              <FaMicrophone className="cursor-pointer hover:text-gray-300 transition" />
            </motion.div>
            <motion.div variants={iconVariants} whileHover="hover">
              <LuSend className="cursor-pointer hover:text-gray-300 transition" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AI;

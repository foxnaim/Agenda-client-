import React from "react";
import { FaPaperclip, FaMicrophone, FaArrowUp } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { MdHandshake } from "react-icons/md";

type Props = {};

const AI = (props: Props) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center p-4 ">
      <div className="w-full max-w-[700px] bg-dop p-4 rounded-2xl flex flex-col shadow-lg">
        {/* Текстовое поле */}
        <textarea
          className="w-full bg-transparent text-white resize-none outline-none placeholder-gray-400 p-2"
          placeholder="Message Agenda..."
          rows={3}
        />

        {/* Панель с кнопками */}
        <div className="mt-4 flex justify-between items-center">
          {/* Кнопки действий */}
          <div className="flex gap-2 sm:gap-3">
            <button className="flex items-center gap-2 text-white border border-gray-500 px-3 py-2 sm:px-4 sm:py-2 rounded-3xl hover:bg-gray-700 transition">
              <LuListTodo className="text-xl" /> 
              <span className="hidden sm:inline">Make a task</span>
            </button>
            <button className="flex items-center gap-2 text-white border border-gray-500 px-3 py-2 sm:px-4 sm:py-2 rounded-3xl hover:bg-gray-700 transition">
              <MdHandshake className="text-xl" /> 
              <span className="hidden sm:inline">Own meeting</span>
            </button>
          </div>

          {/* Иконки */}
          <div className="flex gap-2 sm:gap-3 text-white text-xl">
            <FaPaperclip className="cursor-pointer hover:text-gray-300 transition" />
            <FaMicrophone className="cursor-pointer hover:text-gray-300 transition" />
            <FaArrowUp className="cursor-pointer hover:text-gray-300 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;

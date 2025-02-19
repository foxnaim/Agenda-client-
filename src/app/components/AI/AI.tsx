import React from "react";
import { FaPaperclip, FaMicrophone, FaArrowUp } from "react-icons/fa";

type Props = {};

const AI = (props: Props) => {
  return (
    <div className="mt-6 w-[600px]  bg-dop p-4 rounded-2xl flex flex-col">
      <textarea
        className="w-full bg-transparent text-white resize-none outline-none"
        placeholder="Message Agenda"
      />
      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-white border px-3 py-1 rounded-lg">
            📋 make a task
          </button>
          <button className="flex items-center gap-2 text-white border px-3 py-1 rounded-lg">
            🤝 own meeting
          </button>
        </div>
        <div className="flex gap-2">
          <FaPaperclip className="text-white cursor-pointer" />
          <FaMicrophone className="text-white cursor-pointer" />
          <FaArrowUp className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default AI;

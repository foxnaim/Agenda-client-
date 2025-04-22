"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { LuListTodo, LuSend } from "react-icons/lu";
import { MdHandshake } from "react-icons/md";
import { FiPaperclip } from "react-icons/fi";

type Props = {};

const AI = (props: Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 w-full flex justify-center p-4"
    >
      <div className="w-full max-w-[700px] bg-deepViolet p-4 rounded-2xl flex flex-col shadow-lg border border-deepViolet">
        <textarea
          className="w-full bg-deepViolet text-softLavender resize-none outline-none placeholder-[#D0D3E0] p-2 rounded-lg"
          placeholder="Message Agenda..."
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              className="flex items-center gap-2 text-softLavender border border-deepViolet px-3 py-2 sm:px-4 sm:py-2 rounded-3xl bg-deepViolet hover:bg-pastelPlum transition"
              whileHover={{ scale: 1.1 }}
            >
              <LuListTodo className="text-xl" />
              <span className="hidden sm:inline">Make a task</span>
            </motion.button>
            <motion.button
              className="flex items-center gap-2 text-softLavender border border-deepViolet px-3 py-2 sm:px-4 sm:py-2 rounded-3xl bg-deepViolet hover:bg-pastelPlum transition"
              whileHover={{ scale: 1.1 }}
            >
              <MdHandshake className="text-xl" />
              <span className="hidden sm:inline">Own meeting</span>
            </motion.button>
          </div>

          <div className="flex gap-2 sm:gap-3 text-softLavender text-xl">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiPaperclip className="cursor-pointer hover:text-gray-500 transition" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaMicrophone className="cursor-pointer hover:text-gray-500 transition" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} onClick={handleSendMessage}>
              <LuSend className="cursor-pointer hover:text-gray-500 transition" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AI;

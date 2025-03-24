"use client";

import { motion } from "framer-motion";
import Navigation from "@/app/components/SideBar/Navigation";
import ContactList from "@/app/components/ContactList/page";
import { FiPaperclip } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { contacts, initialMessages, Message as MessageType } from "@/app/components/ContactList/data/data";

const Message = () => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: inputValue, sender: "user" }]);
    setInputValue("");
  };

  return (
    <React.Fragment>
      <Navigation />
      <div className="flex flex-row h-screen w-full p-4 gap-5">
        {/* Окно чата (теперь с отступами) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col flex-grow bg-dop rounded-lg p-4 max-h-screen ml-16 mr-4"  // Отступы слева и справа
        >
          {/* Информация о пользователе */}
          <div className="flex items-center p-4 bg-dopHover rounded-lg">
            <Image 
              src={typeof contacts[0].avatar === "string" ? contacts[0].avatar : contacts[0].avatar.src} 
              alt={contacts[0].name} 
              width={40} 
              height={40} 
              className="rounded-full w-[50px] h-[50px]" 
            />
            <div className="ml-3">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white font-medium">
                {contacts[0].name}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-300 text-sm">
                {contacts[0].points} points
              </motion.p>
            </div>
            <span className="ml-auto bg-green-500 w-3 h-3 rounded-full" />
          </div>

          {/* Окно сообщений */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="flex-1 overflow-y-auto space-y-3 bg-bgop p-4 rounded-lg mt-2"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300"}`}
              >
                {msg.text}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Поле ввода */}
          <motion.div className="flex items-center mt-2 border p-3 rounded-lg bg-dopHover">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 bg-transparent focus:outline-none text-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="ml-2 text-white">
              <FiPaperclip className="cursor-pointer hover:text-gray-300 transition" />
            </button>
            <button className="ml-2 text-white">
              <FaMicrophone className="cursor-pointer hover:text-gray-300 transition" />
            </button>
            <button onClick={sendMessage} className="ml-2 text-white">
              <LuSend className="cursor-pointer hover:text-gray-300 transition" />
            </button>
          </motion.div>
        </motion.div>

        {/* Окно списка пользователей (уменьшено) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/6 bg-dop rounded-lg p-4 max-h-screen"  // Уменьшили размер блока пользователей
        >
          <ContactList contacts={contacts} />
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default Message;

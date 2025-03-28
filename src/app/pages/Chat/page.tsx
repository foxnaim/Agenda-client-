"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navigation from "@/app/components/SideBar/Navigation";
import { FiPaperclip } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import {
  contacts,
  initialMessages,
  Message as MessageType,
} from "@/app/components/ContactList/data/data";

/**
 * Пример ContactList, чтобы показать единый фон у элементов
 * Вы можете изменить стили под свои нужды.
 */
function ContactList() {
  return (
    <div className="flex flex-col space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact.name}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
        >
          <Image
            src={
              typeof contact.avatar === "string"
                ? contact.avatar
                : contact.avatar.src
            }
            alt={contact.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{contact.name}</span>
            <span className="text-sm text-gray-300">{contact.points} points</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const Message = () => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState<string>("");

  // Реф, чтобы прокручивать окно к последнему сообщению
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Автопрокрутка при добавлении сообщения
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Отправка сообщения
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: inputValue, sender: "user" },
    ]);
    setInputValue("");
  };

  // Анимации для контейнеров
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Анимации для каждого сообщения
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Левое меню (фиксированное) */}
      <div className="fixed left-0 top-0 h-full w-[0px] bg-white/10 backdrop-blur-md z-10 flex flex-col items-center py-4">
        <Navigation />
      </div>

      {/* Основная часть: чат + список пользователей */}
      <div className="ml-[160px] h-full flex flex-row p-4 gap-4">
        {/* Блок чата (основная колонка) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col flex-grow bg-white/10 backdrop-blur-md rounded-xl p-4 max-h-screen border border-white/10 shadow-lg"
        >
          {/* Информация о пользователе вверху */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center bg-white/5 rounded-lg p-4 shadow-inner"
          >
            <Image
              src={
                typeof contacts[0].avatar === "string"
                  ? contacts[0].avatar
                  : contacts[0].avatar.src
              }
              alt={contacts[0].name}
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <div className="ml-4">
              <p className="text-white font-semibold text-lg">
                {contacts[0].name}
              </p>
              <p className="text-gray-300 text-sm">
                {contacts[0].points} points
              </p>
            </div>
            {/* Статус (онлайн) */}
            <span className="ml-auto bg-green-500 w-3 h-3 rounded-full" />
          </motion.div>

          {/* Сами сообщения */}
          <motion.div
            className="flex-1 overflow-y-auto mt-4 space-y-4 px-2 py-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { when: "beforeChildren", staggerChildren: 0.1 },
              },
            }}
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={messageVariants}
                className={`max-w-[60%] break-words p-3 rounded-xl text-sm shadow-md
                  ${
                    msg.sender === "user"
                      ? // Сообщения пользователя
                        "ml-auto bg-blue-500 text-white rounded-br-none"
                      : // Сообщения собеседника
                        "bg-gray-600 text-white rounded-bl-none"
                  }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {/* Прокрутка в конец */}
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Поле ввода сообщения */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center mt-2 bg-white/5 rounded-lg p-3 shadow-inner"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-300"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="mx-2 text-gray-300 hover:text-white transition">
              <FiPaperclip size={18} />
            </button>
            <button className="mx-2 text-gray-300 hover:text-white transition">
              <FaMicrophone size={18} />
            </button>
            <button
              onClick={sendMessage}
              className="mx-2 text-gray-300 hover:text-white transition"
            >
              <LuSend size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* Блок со списком пользователей (тот же фон) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-1/5 bg-white/10 backdrop-blur-md rounded-xl p-4 max-h-screen border border-white/10 shadow-lg flex flex-col"
        >
          <h2 className="text-white text-lg font-semibold mb-2">Contacts</h2>
          <div className="overflow-y-auto flex-1">
            {/* Тут используем наш пример ContactList со стилями */}
            <ContactList />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Message;

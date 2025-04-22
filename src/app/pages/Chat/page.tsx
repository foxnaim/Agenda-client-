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

function ContactList() {
  return (
    <div className="flex flex-col space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact.name}
          className="flex items-center gap-3 p-3 rounded-lg bg-pastelPlum/20 backdrop-blur-md text-softLavender hover:bg-pastelPlum/30 transition"
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
            <span className="text-sm text-softLavender/70">
              {contact.points} points
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const Message = () => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: inputValue, sender: "user" },
    ]);
    setInputValue("");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative max-h-screen w-full">
      <div className="fixed left-2 top-0 h-full w-[0px]  backdrop-blur-md z-10 flex flex-col items-center py-4">
        <Navigation />
      </div>

      <div className="ml-[160px] h-full flex flex-row p-4 gap-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col flex-grow bg-deepViolet/40 backdrop-blur-md rounded-xl p-4 max-h-screen border border-softLavender/10 shadow-lg"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center bg-pastelPlum/20 rounded-lg p-4 shadow-inner"
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
              <p className="text-softLavender font-semibold text-lg">
                {contacts[0].name}
              </p>
              <p className="text-softLavender/70 text-sm">
                {contacts[0].points} points
              </p>
            </div>
            <span className="ml-auto bg-green-400 w-3 h-3 rounded-full" />
          </motion.div>

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
                className={`max-w-[60%] break-words p-3 rounded-xl text-sm shadow-md ${
                  msg.sender === "user"
                    ? "ml-auto bg-pastelPlum text-softLavender rounded-br-none"
                    : "bg-deepViolet text-softLavender rounded-bl-none"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center mt-2 bg-pastelPlum/20 rounded-lg p-3 shadow-inner"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent focus:outline-none text-softLavender placeholder-softLavender/50"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="mx-2 text-softLavender/60 hover:text-softLavender transition">
              <FiPaperclip size={18} />
            </button>
            <button className="mx-2 text-softLavender/60 hover:text-softLavender transition">
              <FaMicrophone size={18} />
            </button>
            <button
              onClick={sendMessage}
              className="mx-2 text-softLavender/60 hover:text-softLavender transition"
            >
              <LuSend size={18} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-1/5 bg-deepViolet/40 backdrop-blur-md rounded-xl p-4 max-h-screen border border-softLavender/10 shadow-lg flex flex-col"
        >
          <h2 className="text-softLavender text-lg font-semibold mb-2">
            Contacts
          </h2>
          <div className="overflow-y-auto flex-1">
            <ContactList />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Message;

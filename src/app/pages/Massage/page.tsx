"use client";

import Header from "@/app/components/Header/Header";
import Navigation from "@/app/components/SideBar/Navigation";
import ContactList from "@/app/components/ContactList/page";
import { FiPaperclip } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import React, { useState } from "react";
import Image from "next/image";
import { contacts, initialMessages, Message as MessageType } from "@/app/components/ContactList/data/data";

const Message = () => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState<string>("");

  const sendMessage = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: inputValue, sender: "user" }]);
    setInputValue("");
  };

  return (
    <React.Fragment>
      <Navigation />
      {/* Основной контейнер */}
      <div className="flex flex-col md:flex-row h-screen w-full p-4 gap-5">
        {/* Список контактов */}
        <div className="w-full md:w-1/3 lg:w-1/2">
          <ContactList contacts={contacts} />
        </div>

        {/* Окно чата */}
        <div className="flex flex-col flex-1 bg-dop rounded-lg p-4 max-h-screen w-full">
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
              <p className="text-white font-medium">{contacts[0].name}</p>
              <p className="text-gray-300 text-sm">{contacts[0].points} points</p>
            </div>
            <span className="ml-auto bg-green-500 w-3 h-3 rounded-full" />
          </div>

          {/* Окно сообщений (растягивается) */}
          <div className="flex-1 overflow-y-auto space-y-3 bg-bgop p-4 rounded-lg mt-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user" ? "bg-gray-100 ml-auto" : "bg-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="flex items-center mt-2 border p-3 rounded-lg bg-dopHover">
            <input
              type="text"
              placeholder="send message"
              className="flex-1 bg-transparent focus:outline-none text-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="ml-2 text-white"> 
              <FiPaperclip className="cursor-pointer hover:text-gray-300 transition" />
            </button>
            <button className="ml-2 text-white">  
              <FaMicrophone className="cursor-pointer hover:text-gray-300 transition" />
            </button>
            <button className="ml-2 text-white">
              <LuSend className="cursor-pointer hover:text-gray-300 transition" />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;

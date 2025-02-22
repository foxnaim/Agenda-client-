"use client";

import Header from "@/app/components/Header/Header";
import Navigation from "@/app/components/NavBar/Navigation";
import ContactList from "@/app/components/ContactList";
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
      <Header h1="Agenda" />
      <Navigation />

      <div className="flex h-screen bg-[#A99C7F]">
        {/* Контакты вынесли в компонент */}
        <ContactList contacts={contacts} />

        {/* Окно чата */}
        <div className="flex flex-col w-full max-w-2xl bg-[#978E6E] rounded-lg p-6 m-4">
          <div className="flex items-center mb-4">
            <Image src={contacts[0].avatar} alt={contacts[0].name} width={40} height={40} className="rounded-full" />
            <div className="ml-3">
              <p className="text-white font-medium">{contacts[0].name}</p>
              <p className="text-gray-300 text-sm">{contacts[0].points} points</p>
            </div>
            <span className="ml-auto bg-green-500 w-3 h-3 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 bg-[#A99C7F] p-4 rounded-lg">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user" ? "bg-gray-300 ml-auto" : "bg-gray-400"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="flex items-center mt-4 border p-3 rounded-lg bg-[#B2A489]">
            <input
              type="text"
              placeholder="send message"
              className="flex-1 bg-transparent focus:outline-none text-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="ml-2 text-white">➤</button>
            <button className="ml-2 text-white">🎤</button>
            <button className="ml-2 text-white">📎</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;

"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/app/components/Header/Header";
import Navigation from "@/app/components/SideBar/Navigation";
import AI from "@/app/components/AI/AI";

const Home = () => {
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
  };

  const aiVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.8 } },
  };

  return (
    <React.Fragment>
      <Header h1="" button="Войти" />
      <Navigation />

      {/* Фон как в чате */}
      <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center text-center">
        
        {/* Контейнер с фоном как в блоках чата */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 w-[90%] max-w-md"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          {/* Заголовок */}
          <motion.h1
            className="text-4xl font-semibold text-white"
            variants={headingVariants}
          >
            Hi, I’m Agenda
          </motion.h1>

          {/* Описание */}
          <motion.p
            className="mt-2 text-gray-300"
            variants={textVariants}
          >
            Ready to get started?
          </motion.p>
        </motion.div>

        {/* AI-компонент */}
        <motion.div
          className="mt-6"
          initial="hidden"
          animate="visible"
          variants={aiVariants}
        >
          <AI />
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default Home;

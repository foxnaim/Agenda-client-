"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/app/components/Header/Header";
import Navigation from "@/app/components/SideBar/Navigation";
import AI from "@/app/components/AI/AI";

const Home = () => {
  // Анимации для заголовка
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Анимации для текста
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
  };

  // Анимации для AI-компонента
  const aiVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.8 } },
  };

  return (
    <React.Fragment>
      <Header h1="" button="Войти" />
      <Navigation />
      
      {/* Контейнер для выравнивания по центру */}
      <div className="flex flex-col items-center justify-center mt-[250px] text-center">
        {/* Заголовок с анимацией */}
        <motion.h1
          className="text-4xl font-semibold text-white"
          initial="hidden"
          animate="visible"
          variants={headingVariants}
        >
          Hi, I’m Agenda
        </motion.h1>

        {/* Описание с анимацией */}
        <motion.p
          className="mt-2 text-white"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Ready to get started?
        </motion.p>
        
       <div>
          <AI />
       </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

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

  return (
    <React.Fragment>
      <Navigation />

      {/* Фоновый градиент на основе новых цветов */}
      <div className="h-screen w-full bg-gradient-to-br from-deepViolet via-royalAubergine to-black flex flex-col items-center justify-center text-center p-6">
        
        {/* Заголовок */}
        <motion.h1
          className="text-4xl font-bold text-softLavender"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Hi, I’m Agenda
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          className="mt-3 text-pastelPlum text-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Ready to get started?
        </motion.p>

        {/* AI-компонент */}
        <motion.div
          className="mt-10"
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <AI />
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default Home;

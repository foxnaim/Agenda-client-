"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../SideBar/Navigation";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Функция проверки сложности пароля
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return "Слабый";
    if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return "Средний";
    }
    return "Сильный";
  };

  // Обработчик ввода пароля
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    if (passwordStrength === "Слабый") {
      alert("Пароль слишком слабый!");
      return;
    }

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, notifications }),
      });

      if (response.ok) {
        alert("Настройки сохранены!");
      } else {
        console.error("Ошибка при сохранении настроек");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  // Анимации для контейнера
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Анимации для элементов формы
  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  // Анимации для кнопки
  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#3B3B3B", transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex items-center justify-center min-h-screen bg-bgop text-white"
    >
      <Navigation />
      <motion.div
        className="max-w-lg w-full p-6 bg-dopHover shadow-md rounded-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Настройки</h2>

        {/* Имя пользователя */}
        <motion.div
          className="mb-4"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-white font-medium mb-2">Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-dop text-white placeholder-gray-400"
            placeholder="Введите имя"
          />
        </motion.div>

        {/* Новый пароль */}
        <motion.div
          className="mb-4"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-white font-medium mb-2">Новый пароль</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-600 rounded-lg bg-dop text-white placeholder-gray-400"
            placeholder="Введите новый пароль"
          />
          {/* Индикатор качества пароля */}
          <p className={`mt-1 text-sm ${passwordStrength === "Слабый" ? "text-red-500" : passwordStrength === "Средний" ? "text-yellow-500" : "text-green-500"}`}>
            {passwordStrength && `Сложность: ${passwordStrength}`}
          </p>
        </motion.div>

        {/* Подтверждение пароля */}
        <motion.div
          className="mb-4"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-white font-medium mb-2">Подтвердите пароль</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-dop text-white placeholder-gray-400"
            placeholder="Повторите пароль"
          />
        </motion.div>

        {/* Уведомления */}
        <motion.div
          className="mb-6 flex items-center"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="mr-2"
          />
          <span className="text-white">Получать уведомления</span>
        </motion.div>

        {/* Кнопка сохранения */}
        <motion.button
          onClick={handleSave}
          className="w-full bg-dop text-white p-2 rounded-lg hover:bg-dopHover transition"
          variants={buttonVariants}
          whileHover="hover"
        >
          Сохранить изменения
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Settings;

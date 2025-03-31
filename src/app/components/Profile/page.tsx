"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../SideBar/Navigation";

const Profile = () => {
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [username, setUsername] = useState("Иван Иванов");
  const [email, setEmail] = useState("ivan@example.com");
  const [bio, setBio] = useState("Frontend-разработчик. Люблю React и Tailwind.");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewAvatar(event.target.files[0]);
      setAvatar(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      if (newAvatar) formData.append("avatar", newAvatar);

      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Профиль обновлен!");
      } else {
        console.error("Ошибка при обновлении профиля");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      // Фон страницы – темно-синий, текст – светлый
      style={{ backgroundColor: "var(--bgop)", color: "var(--light)" }}
      className="flex items-center justify-center min-h-screen"
    >
      <Navigation />
      <motion.div
        className="max-w-lg w-full p-6 shadow-md rounded-lg"
        // Фон карточки – темно-синий с небольшим отличием (var(--dark))
        style={{ backgroundColor: "var(--dark)" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "var(--light)" }}>
          Профиль
        </h2>

        {/* Аватар */}
        <motion.div className="flex flex-col items-center mb-4">
          <img
            src={avatar}
            alt="Аватар"
            className="w-24 h-24 rounded-full border-2"
            style={{ borderColor: "var(--light)" }}
          />
          <label
            className="mt-2 text-sm cursor-pointer"
            style={{ color: "var(--light)" }}
          >
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            Изменить аватар
          </label>
        </motion.div>

        {/* Имя пользователя */}
        <motion.div className="mb-4">
          <label className="block font-medium mb-2" style={{ color: "var(--light)" }}>
            Имя пользователя
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя"
            className="w-full p-2 border rounded-lg placeholder-gray-300"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--light)",
              color: "var(--light)",
            }}
          />
        </motion.div>

        {/* Email */}
        <motion.div className="mb-4">
          <label className="block font-medium mb-2" style={{ color: "var(--light)" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            className="w-full p-2 border rounded-lg placeholder-gray-300"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--light)",
              color: "var(--light)",
            }}
          />
        </motion.div>

        {/* Биография */}
        <motion.div className="mb-4">
          <label className="block font-medium mb-2" style={{ color: "var(--light)" }}>
            О себе
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Напишите пару слов о себе"
            className="w-full p-2 border rounded-lg placeholder-gray-300 h-24"
            style={{
              backgroundColor: "var(--dark)",
              borderColor: "var(--light)",
              color: "var(--light)",
            }}
          />
        </motion.div>

        {/* Кнопка сохранения */}
        <motion.button
          onClick={handleSave}
          className="w-full p-2 rounded-lg transition"
          variants={buttonVariants}
          whileHover="hover"
          // Кнопка с акцентом – зелёная (var(--dop)) и светлым текстом
          style={{ backgroundColor: "var(--dop)", color: "var(--light)" }}
        >
          Сохранить изменения
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

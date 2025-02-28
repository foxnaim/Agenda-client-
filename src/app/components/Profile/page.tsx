"use client";
import React, { useState } from "react";
import Navigation from "../SideBar/Navigation";

const Profile = () => {
  const [avatar, setAvatar] = useState("/default-avatar.png"); // Начальный аватар
  const [username, setUsername] = useState("Иван Иванов");
  const [email, setEmail] = useState("ivan@example.com");
  const [bio, setBio] = useState("Frontend-разработчик. Люблю React и Tailwind.");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  // Обработчик загрузки нового аватара
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewAvatar(event.target.files[0]);
      setAvatar(URL.createObjectURL(event.target.files[0])); // Показываем превью
    }
  };

  // Сохранение изменений
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgop text-white">
      <Navigation />
      <div className="max-w-lg w-full p-6 bg-dopHover shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Профиль</h2>

        {/* Аватар */}
        <div className="flex flex-col items-center mb-4">
          <img src={avatar} alt="Аватар" className="w-24 h-24 rounded-full border-2 border-gray-500" />
          <label className="mt-2 text-sm text-gray-400 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            Изменить аватар
          </label>
        </div>

        {/* Имя пользователя */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-dop text-white placeholder-gray-400"
            placeholder="Введите имя"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-dop text-white placeholder-gray-400"
            placeholder="Введите email"
          />
        </div>

        {/* Биография */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">О себе</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-dop text-white placeholder-gray-400 h-24"
            placeholder="Напишите пару слов о себе"
          />
        </div>

        {/* Кнопка сохранения */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};

export default Profile;

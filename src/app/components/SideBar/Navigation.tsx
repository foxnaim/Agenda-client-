"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TiHome } from "react-icons/ti";
import { FaTasks, FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Ошибка при выходе");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  return (
    <nav className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col items-center p-4 bg-dop w-[90px] h-[350px] rounded-3xl">
      <ul className="text-white flex flex-col gap-8 w-full">
        {[
          { icon: <TiHome className="size-8" />, text: "Home", path: "/" },
          { icon: <FaTasks className="size-8" />, text: "Задачи", path: "/../../pages/TaskDashboard" },
          { icon: <FaUserFriends className="size-8" />, text: "Друзья", path: "/../../pages/Chat" },
        ].map((item, index) => (
          <li
            key={index}
            className="relative flex items-center gap-3 p-2 hover:bg-dopHover rounded-2xl cursor-pointer group"
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-dop text-white text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300">
              {item.text}
            </span>
          </li>
        ))}

        {/* Профиль с выпадающим меню */}
        <li className="relative flex items-center gap-3 p-2 hover:bg-dopHover rounded-2xl cursor-pointer group">
          <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}>
            <CgProfile className="size-8" />
          </button>
          <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-dop text-white text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300">
            Профиль
          </span>

          {/* Выпадающее меню */}
          {isProfileMenuOpen && (
            <ul className="absolute left-14 top-10 bg-dop text-white text-sm rounded-lg shadow-md py-2 w-32">
              <li
                className="p-2 hover:bg-dopHover cursor-pointer"
                onClick={() => router.push("/components/Profile")}
              >
                Профиль
              </li>
              <li
                className="p-2 hover:bg-dopHover cursor-pointer"
                onClick={() => router.push("/components/Setting")}
              >
                Настройки
              </li>
              <li
                className="p-2 hover:bg-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                Выйти
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

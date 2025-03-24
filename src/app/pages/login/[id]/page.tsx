"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TiHome } from "react-icons/ti";
import { FaTasks, FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";

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
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col items-center p-4 bg-dop w-[90px] h-[350px] rounded-3xl"
    >
      <ul className="text-white flex flex-col gap-8 w-full">
        {[
          { icon: <TiHome className="size-8" />, text: "Home", path: "/" },
          { icon: <FaTasks className="size-8" />, text: "Задачи", path: "/../../pages/TaskDashboard" },
          { icon: <FaUserFriends className="size-8" />, text: "Друзья", path: "/../../pages/Chat" },
        ].map((item, index) => (
          <motion.li
            key={index}
            className="relative flex items-center gap-3 p-2 rounded-2xl cursor-pointer group"
            onClick={() => router.push(item.path)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {item.icon}
            <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-dop text-white text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300">
              {item.text}
            </span>
          </motion.li>
        ))}

        {/* Профиль с выпадающим меню */}
        <motion.li
          className="relative flex items-center gap-3 p-2 rounded-2xl cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}>
            <CgProfile className="size-8" />
          </button>
          <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-dop text-white text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300">
            Профиль
          </span>

          {/* Выпадающее меню */}
          {isProfileMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-14 top-10 bg-dop text-white text-sm rounded-lg shadow-md py-2 w-32"
            >
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
            </motion.ul>
          )}
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navigation;

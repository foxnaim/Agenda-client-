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
    <nav
      className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col items-center p-4 w-[90px] h-[350px] rounded-3xl"
      style={{ backgroundColor: "var(--bgop)" }}
    >
      <ul className="text-white flex flex-col gap-8 w-full">
        {[
          { icon: <TiHome className="w-6 h-6" />, text: "Home", path: "/" },
          { icon: <FaTasks className="w-6 h-6" />, text: "Задачи", path: "/../../pages/TaskDashboard" },
          { icon: <FaUserFriends className="w-6 h-6" />, text: "Друзья", path: "/../../pages/Chat" },
        ].map((item, index) => (
          <li
            key={index}
            className="relative flex items-center gap-3 p-2 rounded-2xl cursor-pointer group"
            style={{ transition: "background-color 0.3s" }}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span
              className="absolute left-14 opacity-0 group-hover:opacity-100 text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300"
              style={{ backgroundColor: "var(--dark)" }}
            >
              {item.text}
            </span>
          </li>
        ))}

        {/* Профиль с выпадающим меню */}
        <li
          className="relative flex items-center gap-3 p-2 rounded-2xl cursor-pointer group"
          style={{ transition: "background-color 0.3s" }}
        >
          <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}>
            <CgProfile className="w-6 h-6" />
          </button>
          <span
            className="absolute left-14 opacity-0 group-hover:opacity-100 text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300"
            style={{ backgroundColor: "var(--dark)" }}
          >
            Профиль
          </span>

          {/* Выпадающее меню */}
          {isProfileMenuOpen && (
            <ul
              className="absolute left-14 top-10 text-sm rounded-lg shadow-md py-2 w-32"
              style={{ backgroundColor: "var(--bgop)" }}
            >
              <li
                className="p-2 cursor-pointer"
                onClick={() => router.push("/components/Profile")}
                style={{ transition: "background-color 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--dark)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bgop)")
                }
              >
                Профиль
              </li>
              <li
                className="p-2 cursor-pointer"
                onClick={() => router.push("/components/Setting")}
                style={{ transition: "background-color 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--dark)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bgop)")
                }
              >
                Настройки
              </li>
              <li
                className="p-2 cursor-pointer"
                onClick={handleLogout}
                style={{ transition: "background-color 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ff0000")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bgop)")
                }
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

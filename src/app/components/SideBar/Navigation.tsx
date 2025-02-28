import React from "react";
import { TiHome } from "react-icons/ti";
import { FaTasks, FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  return (
    <nav className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col items-center p-4 bg-dop w-[90px] h-[350px] rounded-3xl">
      <ul className="text-white flex flex-col gap-8 w-full">
        {[
          { icon: <TiHome className="size-8" />, text: "Home" },
          { icon: <FaTasks className="size-8" />, text: "Задачи" },
          { icon: <FaUserFriends className="size-8" />, text: "Друзья" },
          { icon: <CgProfile className="size-8" />, text: "Профиль" },
        ].map((item, index) => (
          <li key={index} className="relative flex items-center gap-3 p-2 hover:bg-dopHover rounded-2xl cursor-pointer group">
            {item.icon}
            <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-dop text-white text-sm px-3 py-1 rounded-lg shadow-md transition-opacity duration-300">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

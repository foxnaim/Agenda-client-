import React from "react";
import { TiHome } from "react-icons/ti";
import { FaTasks, FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  return (
    <nav className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col items-center p-4 bg-dop w-[90px] h-[350px] rounded-r-3xl">
      <ul className="text-white flex flex-col gap-4 w-full">
        {[
          { icon: <TiHome className="size-[50px]" />, text: "Home" },
          { icon: <FaTasks className="size-[50px]" />, text: "Задачи" },
          { icon: <FaUserFriends className="size-[50px]" />, text: "Друзья" },
          { icon: <CgProfile className="size-[50px]" />, text: "Профиль" },
        ].map((item, index) => (
          <li key={index} className="relative flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer group">
            {item.icon}
            <span className="absolute left-12 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-sm px-3 py-1 rounded-md shadow-md transition-opacity duration-300">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

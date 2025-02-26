import React from "react";
import { TiHome } from "react-icons/ti";
import { FaTasks, FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  return (
    <nav className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col justify-between items-center p-4 bg-dop w-[60px] h-[350px] rounded-r-3xl hover:w-[160px] duration-300">
      <ul className="text-white flex flex-col justify-around h-full w-full">
        <li className="hover:flex items-center gap-3 ">
          <TiHome className="size-7 text-white" /> 
          <p className="duration-300 opacity-0 hover:opacity-100 text-lg whitespace-nowrap">
            Home
          </p>
        </li>
        <li className="flex items-center gap-3">
          <FaTasks className="w-7 h-7 text-white" />
          <span className="opacity-0 hover:opacity-100 duration-300 text-lg whitespace-nowrap">
            Задачи
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaUserFriends className="w-7 h-7 text-white" />
          <span className="opacity-0 hover:opacity-100 duration-300 text-lg whitespace-nowrap">
            Друзья
          </span>
        </li>
        <li className="flex items-center gap-3">
          <CgProfile className="w-7 h-7 text-white" />
          <span className="opacity-0 hover:opacity-100 duration-300 text-lg whitespace-nowrap">
            Профиль
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

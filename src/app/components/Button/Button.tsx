import React from "react";
import { IconType } from "react-icons";
import Image from "next/image";

type Props = {
  name: string;
  text: string;
  Icon?: IconType;
  ImageSrc?: string;
  fullWidth?: boolean; // Опция для широкой кнопки
  disabled?: boolean; // Отключение кнопки
  onClick?: () => void; // Добавляем обработчик клика
};

const Button: React.FC<Props> = ({ name, text, Icon, ImageSrc, fullWidth, disabled, onClick }) => {
  return (
    <button
      name={name}
      disabled={disabled}
      onClick={onClick} // Передаём onClick в кнопку
      className={`
        flex items-center justify-center px-5 py-3 rounded-lg 
        ${fullWidth ? "w-full" : "w-auto"} 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-dop hover:bg-dopHover transition duration-300"} 
        text-white font-medium text-lg gap-2
      `}
    >
      {ImageSrc && <Image src={ImageSrc} alt="icon" width={24} height={24} />}
      {Icon && <Icon className="text-white text-2xl" />}
      {text}
    </button>
  );
};

export default Button;

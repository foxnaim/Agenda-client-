import React from "react";
import { IconType } from "react-icons";

type Props = {
  name: string;
  text: string;
  Icon?: IconType;
};

const Button: React.FC<Props> = ({ name, text, Icon }) => {
  return (
    <button 
      name={name} 
      className="flex items-center px-4 py-2 bg-dop text-white rounded-lg hover:bg-dopHover transition duration-300">
      {Icon && <Icon className="text-gray-400 mr-2 text-2xl" />}
      {text}
    </button>
  );
};

export default Button;


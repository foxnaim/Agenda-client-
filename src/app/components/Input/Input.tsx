import React from "react";
import { IconType } from "react-icons";

type Props = {
  type: string;
  name: string;
  placeholder: string;
  Icon?: IconType;
};

const Input: React.FC<Props> = ({ type, name, placeholder, Icon }) => {
  return (
    <div className="relative flex items-center border-b-2 border-gray-300 w-full py-2">
      {Icon && <Icon className="absolute left-2 text-gray-400 text-2xl" />}
      
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-white placeholder:text-gray-300 pl-10 p-2"
      />
    </div>
  );
};

export default Input;

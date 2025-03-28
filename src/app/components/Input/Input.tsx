import React, { ChangeEvent } from "react";
import { IconType } from "react-icons";

type Props = {
  type: string;
  name: string;
  placeholder: string;
  Icon?: IconType;
  value: string; // Добавляем value
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Добавляем обработчик изменений
};

const Input: React.FC<Props> = ({ type, name, placeholder, Icon, value, onChange }) => {
  return (
    <div className="relative flex items-center border-b-2 border-gray-300 w-full py-2">
      {Icon && <Icon className="absolute left-2 text-gray-400 text-2xl" />}

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value} // Добавлено
        onChange={onChange} // Добавлено
        className="w-full bg-transparent outline-none text-white placeholder:text-gray-300 pl-10 p-2"
      />
    </div>
  );
};

export default Input;

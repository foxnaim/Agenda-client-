import React from "react";
import { Plus } from "lucide-react"; 

const AddCard: React.FC = () => {
  return (
    <div className="w-[180px] h-[180px] border-2 border-[#9C9278] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#9C92781A] transition">
      <Plus size={40} color="#9C9278" />
    </div>
  );
};

export default AddCard;

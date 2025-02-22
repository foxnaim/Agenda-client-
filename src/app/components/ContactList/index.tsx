import React from "react";
import Image from "next/image";

type Contact = {
  id: number;
  name: string;
  points: number;
  avatar: string;
  online: boolean;
};

type ContactListProps = {
  contacts: Contact[];
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className="w-[400px] bg-[#8B7E61] p-4 rounded-lg m-4">
      <h3 className="text-white font-bold mb-4">Filters for counts of points</h3>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center p-3 bg-[#B2A489] rounded-lg">
            <Image src={contact.avatar} alt={contact.name} width={40} height={40} className="rounded-full" />
            <div className="ml-3">
              <p className="text-white font-medium">{contact.name}</p>
              <p className="text-gray-300 text-sm">{contact.points} points</p>
            </div>
            {contact.online && <span className="ml-auto bg-green-500 w-3 h-3 rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
   
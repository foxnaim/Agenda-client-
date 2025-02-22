import React from "react";
import Image, { StaticImageData }  from "next/image";
import { Contact } from "./data/data";

interface ContactListProps {
  contacts: Contact[];
}


const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className="w-[400px] bg-dop p-4 rounded-lg m-4">
      <h3 className="text-white font-bold mb-4">Filters for counts of points</h3>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center p-3 bg-[#B2A489] rounded-lg">
            <Image src={contact.avatar} alt={contact.name} width={50} height={50} className="rounded-full " />
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
   
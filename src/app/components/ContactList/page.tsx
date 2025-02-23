import React from "react";
import Image, { StaticImageData } from "next/image";
import { Contact } from "./data/data";

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-full max-w-[450px] bg-dop p-6 rounded-lg m-4 flex flex-col h-full md:h-auto">
        <h3 className="text-white font-bold mb-4 text-center">Filters for counts of points</h3>
        <div className="flex flex-col gap-3 flex-grow overflow-auto">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center p-3 bg-[#B2A489] rounded-lg shadow-md">
              <Image 
                src={typeof contact.avatar === "string" ? contact.avatar : (contact.avatar as StaticImageData).src} 
                alt={contact.name} 
                width={50} 
                height={50} 
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="text-white font-medium">{contact.name}</p>
                <p className="text-gray-300 text-sm">{contact.points} points</p>
              </div>
              {contact.online && <span className="ml-auto bg-green-500 w-3 h-3 rounded-full" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;

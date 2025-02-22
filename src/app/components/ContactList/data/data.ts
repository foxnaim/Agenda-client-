import avatar from "../../../images/user/img.png";
import avatar2 from "../../../images/user/img2.jpg";
import avatar3 from "../../../images/user/img3.jpg";
import { StaticImageData } from "next/image";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "contact";
};

export type Contact = {
  id: number;
  name: string;
  points: number;
  avatar: string | StaticImageData; 
  online: boolean;
};

export const contacts: Contact[] = [
  { id: 1, name: "Jordan Maretti", points: 224, avatar: avatar.src,  online: true },
  { id: 2, name: "Lay Blaskovic", points: 156, avatar:avatar2.src, online: false },
  { id: 3, name: "Nefor Kakoyto", points: 92, avatar: avatar3.src,  online: false },
];

export const initialMessages: Message[] = [
  { id: 1, text: "hi!! What’s up?", sender: "user" },
  { id: 2, text: "Hello!! I’m fine, and you??)", sender: "contact" },
  { id: 3, text: "Yeah!! I’m good =)", sender: "user" },
];

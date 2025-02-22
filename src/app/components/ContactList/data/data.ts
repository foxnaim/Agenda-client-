export type Message = {
 id: number;
 text: string;
 sender: "user" | "contact";
};

export type Contact = {
 id: number;
 name: string;
 points: number;
 avatar: string;
 online: boolean;
};

export const contacts: Contact[] = [
 { id: 1, name: "Jordan Maretti", points: 224, avatar: "...", online: true },
 { id: 2, name: "Lay Blaskovic", points: 156, avatar: "...", online: false },
 { id: 3, name: "Nefor Kakoyto", points: 92, avatar: "...", online: false },
];

export const initialMessages: Message[] = [
 { id: 1, text: "hi!! What’s up?", sender: "user" },
 { id: 2, text: "Hello!! I’m fine, and you??)", sender: "contact" },
 { id: 3, text: "Yeah!! I’m good =)", sender: "user" },
];

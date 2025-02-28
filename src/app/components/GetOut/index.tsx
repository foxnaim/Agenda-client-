import React from "react";
import { useRouter } from "next/navigation";

const GetOut = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login"); // Перенаправление на страницу входа
      } else {
        console.error("Ошибка при выходе");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Вы действительно хотите выйти?</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Выйти
      </button>
    </div>
  );
};

export default GetOut;

import axios from "axios";
import { BASE_URL } from "./context/context";

export type AuthResponse = {
  message: string;
  data?: any;
};

// Функция проверки email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Функция проверки пароля
const isValidPassword = (password: string): boolean => {
  return password.length >= 6; // Минимальная длина пароля - 6 символов
};

// Регистрация пользователя
export const registerUser = async (
email: string, password: string, firstName: string, lastName: string, phone: string, dateBirth: string): Promise<AuthResponse> => {
  // Проверка валидности данных
  if (!email || !password || !firstName) {
    throw new Error("All fields are required.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format.");
  }
  if (!isValidPassword(password)) {
    throw new Error("Password must be at least 6 characters long.");
  }

  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email,
      password,
      firstName,
    });
    return { message: "Registration successful!", data: response.data };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed.");
  }
};

// Логин пользователя
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Проверка валидности данных
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format.");
  }
  if (!isValidPassword(password)) {
    throw new Error("Password must be at least 6 characters long.");
  }

  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return { message: "Login successful!", data: response.data };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

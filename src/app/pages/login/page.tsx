"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { CiLogin, CiUser } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import Google from "@/app/images/icon/Google.svg";
import { registerUser, loginUser } from "@/app/servises/auth"; // Исправил путь к сервису

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Поля формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Обработчик формы
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (loading) return;

    setLoading(true);
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const { message } = await registerUser(
          email,
          password,
          firstName,
          lastName,
          phone,
          dateBirth
        );
        alert(message);
      } else {
        const { message } = await loginUser(email, password);
        alert(message);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Левая сторона (форма) */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10"
        style={{ backgroundColor: "var(--bgop)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <form
          className="p-6 md:p-10 rounded-xl w-full max-w-sm text-center"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignUp ? "Sign up" : "Welcome"}
          </h1>

          <div className="mb-4 space-y-4">
            {/* Email */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdOutlineMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Поля для регистрации */}
            {isSignUp && (
              <>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  Icon={FaRegUserCircle}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  Icon={FaRegUserCircle}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  Icon={FaRegUserCircle}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  type="date"
                  name="dateBirth"
                  placeholder="Date of Birth"
                  Icon={FaRegUserCircle}
                  value={dateBirth}
                  onChange={(e) => setDateBirth(e.target.value)}
                />
              </>
            )}

            {/* Password */}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              Icon={MdLockOutline}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Подтверждение пароля для регистрации */}
            {isSignUp && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                Icon={MdLockOutline}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>

          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Button
              name={isSignUp ? "Sign Up" : "Login"}
              text={loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
              Icon={isSignUp ? CiUser : CiLogin}
              fullWidth
              type="submit" // Теперь можно использовать type
              disabled={loading}
            />
          </motion.div>

          {/* Ссылка "Forgot password" */}
          {!isSignUp && (
            <motion.div className="text-sm mt-2 text-gray-400">
              <Link href="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </motion.div>
          )}

          {/* Переключатель между режимами регистрации и логина */}
          <div className="mt-4 text-gray-400">
            {isSignUp ? (
              <p>
                Already have an account?
                <motion.span
                  className="text-blue-400 cursor-pointer hover:underline ml-1 inline-block"
                  onClick={() => setIsSignUp(false)}
                  whileHover={{ scale: 1.1 }}
                >
                  Login
                </motion.span>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?
                <motion.span
                  className="text-blue-400 cursor-pointer hover:underline ml-1 inline-block"
                  onClick={() => setIsSignUp(true)}
                  whileHover={{ scale: 1.1 }}
                >
                  Sign up
                </motion.span>
              </p>
            )}
          </div>
        </form>
      </motion.div>

      {/* Правая сторона (информация) */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left text-white p-6 md:p-8"
        style={{ backgroundColor: "var(--dark)" }}
        initial={{ opacity: 0, x: "10%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg">Manage your tasks effectively with our app</p>
        <h1 className="text-5xl md:text-[6rem] font-bold mt-4">Agenda</h1>
        <p className="text-lg mt-40">Your assistant in task management</p>
      </motion.div>
    </div>
  );
};

export default Login;

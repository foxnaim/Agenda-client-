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
import { registerUser, loginUser } from "@/app/servises/auth"; // Импорт функций

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  // Анимации формы
  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleFormSubmit = async () => {
    try {
      if (isSignUp) {
        // Регистрация
        const { message } = await registerUser(email, password, firstName);
        alert(message);
      } else {
        // Логин
        const { message } = await loginUser(email, password);
        alert(message);
      }
    } catch (error: any) {
      alert(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Левая часть */}
      <motion.div
        className="bg-bgop w-full md:w-1/2 flex items-center justify-center p-6 md:p-10"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <form
          className="p-6 md:p-10 rounded-xl w-full max-w-sm border-2 border-dop text-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignUp ? "Sign up" : "Welcome"}
          </h1>

          <div className="mb-4 space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdOutlineMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSignUp && (
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                Icon={FaRegUserCircle}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              Icon={MdLockOutline}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Кнопка входа/регистрации */}
            <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }}>
              <Button
                name={isSignUp ? "Sign Up" : "Login"}
                text={isSignUp ? "Sign Up" : "Login"}
                Icon={isSignUp ? CiUser : CiLogin}
                fullWidth
                onClick={handleFormSubmit}
              />
            </motion.div>
          </div>

          {!isSignUp && (
            <motion.div
              className="text-sm mt-2 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </motion.div>
          )}

          {/* Разделитель */}
          <div className="flex items-center justify-center mt-6 gap-4">
            <div className="border-t border-gray-400 w-16" />
            <span className="text-gray-400">Or</span>
            <div className="border-t border-gray-400 w-16" />
          </div>

          {/* Кнопка Google */}
          <motion.div className="mt-4 flex justify-center" whileHover={{ scale: 1.1 }}>
            <Button name="Google" text="Sign in with Google" ImageSrc={Google} />
          </motion.div>

          {/* Переключение между входом и регистрацией */}
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
                Don't have an account?
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

      {/* Правая часть */}
      <motion.div
        className="w-full md:w-1/2 bg-dop flex flex-col items-center justify-center text-center md:text-left text-white p-6 md:p-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 },
          },
        }}
      >
        <p className="text-lg">
          Hello, I am your assistant in implementing task assignment using my
          intelligence
        </p>
        <h1 className="text-5xl md:text-[6rem] font-bold mt-4">Agenda</h1>
        <p className="text-lg mt-40">Your assistant in task management</p>
      </motion.div>
    </div>
  );
};

export default Login;

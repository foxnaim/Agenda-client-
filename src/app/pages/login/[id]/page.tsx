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

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Анимации формы
  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Анимации для кнопок
  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "#3B3B3B",
      transition: { duration: 0.2 },
    },
  };

  // Анимации правой части
  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
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
        <form className="p-6 md:p-10 rounded-xl w-full max-w-sm border-2 border-dop text-center">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignUp ? "Sign up" : "Welcome"}
          </h1>

          <div className="mb-4 space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdOutlineMail}
            />
            {!isSignUp && (
              <>
                <Input
                  type="firstName"
                  name="firstName"
                  placeholder="firstName"
                  Icon={MdLockOutline}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  Icon={FaRegUserCircle}
                />
              </>
            )}

            {/* Кнопка входа/регистрации */}
            <motion.div
              className="flex justify-center"
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button
                name={isSignUp ? "SignUp" : "Login"}
                text={isSignUp ? "Sign Up" : "Login"}
                Icon={isSignUp ? CiUser : CiLogin}
                fullWidth
              />
            </motion.div>
          </div>

          {/* Ссылки */}
          {!isSignUp && (
            <motion.div
              className="flex justify-between text-sm mt-2 text-gray-600"
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
            <div className="border-t border-gray-300 w-16" />
            <span className="text-gray-500">Or</span>
            <div className="border-t border-gray-300 w-16" />
          </div>

          {/* Кнопка Google */}
          <motion.div
            className="mt-4 flex justify-center"
            variants={buttonVariants}
            whileHover="hover"
          >
            <Button
              name="Google"
              text="Sign in with Google"
              ImageSrc={Google}
            />
          </motion.div>

          {/* Переключение между входом и регистрацией */}
          <div className="mt-4 text-gray-600">
            {isSignUp ? (
              <p>
                Already have an account?
                <motion.span
                  className="text-blue-500 cursor-pointer hover:underline ml-1"
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
                  className="text-blue-500 cursor-pointer hover:underline ml-1"
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
        variants={textVariants}
      >
        <p className="text-lg">
          Hello, I am your assistant in implementing task assignment using my
          intelligence
        </p>
        <h1 className="text-5xl md:text-[6rem] font-bold mt-4">Agenda</h1>
        <p className="text-lg mt-2">Your assistant in task management</p>
      </motion.div>
    </div>
  );
};

export default Login;

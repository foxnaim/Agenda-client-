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
import { registerUser, loginUser } from "@/app/servises/auth";

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Общие поля
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Поля регистрации
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Если регистрация, проверяем совпадение паролей
      if (isSignUp && password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const { message } = isSignUp
        ? await registerUser(email, password, firstName, lastName, phone, dateBirth)
        : await loginUser(email, password);

      alert(message);
    } catch (error: any) {
      alert(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Левая сторона (форма) */}
      <motion.div
        className="bg-bgop w-full md:w-1/2 flex items-center justify-center p-6 md:p-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            {/* Email */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdOutlineMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Режим регистрации */}
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
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
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

          <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }}>
            <Button
              name={isSignUp ? "Sign Up" : "Login"}
              text={loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
              Icon={isSignUp ? CiUser : CiLogin}
              fullWidth
              onClick={handleFormSubmit}
              disabled={loading}
            />
          </motion.div>

          {/* Ссылка "Forgot password" для логина */}
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

          {/* Кнопка для входа через Google */}
          <motion.div className="mt-4 flex justify-center" whileHover={{ scale: 1.1 }}>
            <Button name="Google" text="Sign in with Google" ImageSrc={Google} />
          </motion.div>

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
        className="w-full md:w-1/2 bg-dop flex flex-col items-center justify-center text-center md:text-left text-white p-6 md:p-8"
        initial={{ opacity: 0, x: "10%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg">
          Hello, I am your assistant in implementing task assignment using my intelligence
        </p>
        <h1 className="text-5xl md:text-[6rem] font-bold mt-4">Agenda</h1>
        <p className="text-lg mt-40">Your assistant in task management</p>
      </motion.div>
    </div>
  );
};

export default Login;

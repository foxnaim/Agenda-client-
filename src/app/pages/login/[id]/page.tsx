"use client"

import React, { useState } from "react";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { CiLogin, CiUser } from "react-icons/ci";
import Link from "next/link";
import Google from "@/app/images/icon/Google.svg";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); 

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-bgop w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <form className="p-6 md:p-10 rounded-xl w-full max-w-sm border-2 border-dop text-center">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignUp ? "Sign up" : "Welcome"}
          </h1>

          <div className="mb-4 space-y-4">
          {!isSignUp && (
           <Input type="password" name="password" placeholder="Password" Icon={MdLockOutline} />
               )}
            <Input type="email" name="email" placeholder="Email" Icon={MdOutlineMail} />
            
            {/* Кнопка входа/регистрации */}
            <div className="flex justify-center">
              <Button 
                name={isSignUp ? "SignUp" : "Login"} 
                text={isSignUp ? "Sign Up" : "Login"} 
                Icon={isSignUp ? CiUser : CiLogin} 
                fullWidth 
              />
            </div>
          </div>

          {/* Ссылки */}
          {!isSignUp && (
            <div className="flex justify-between text-sm mt-2 text-gray-600">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
            </div>
          )}

          {/* Разделитель */}
          <div className="flex items-center justify-center mt-6 gap-4">
            <div className="border-t border-gray-300 w-16" />
            <span className="text-gray-500">Or</span>
            <div className="border-t border-gray-300 w-16" />
          </div>

          {/* Кнопка Google */}
          <div className="mt-4 flex justify-center">
            <Button name="Google" text="Sign in with Google" ImageSrc={Google} />
          </div>

          {/* Переключение между входом и регистрацией */}
          <div className="mt-4 text-gray-600">
            {isSignUp ? (
              <p>
                Already have an account? 
                <span 
                  className="text-blue-500 cursor-pointer hover:underline ml-1"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account? 
                <span 
                  className="text-blue-500 cursor-pointer hover:underline ml-1"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Правая часть */}
      <div className="w-full md:w-1/2 bg-dop flex flex-col items-center justify-center text-center md:text-left text-white p-6 md:p-8">
        <p className="text-lg">Hello, I am your assistant in implementing task assignment using my intelligence</p>
        <h1 className="text-5xl md:text-[6rem] font-bold mt-4">Agenda</h1>
        <p className="text-lg mt-2">Your assistant in task management</p>
      </div>
    </div>
  );
};

export default Login;

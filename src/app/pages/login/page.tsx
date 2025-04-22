"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { CiLogin, CiUser } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser, loginUser } from "@/app/servises/auth";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: yup.string().when("isSignUp", {
    is: true,
    then: yup.string().required("First Name is required"),
  }),
  lastName: yup.string().when("isSignUp", {
    is: true,
    then: yup.string().required("Last Name is required"),
  }),
  phone: yup.string().when("isSignUp", {
    is: true,
    then: yup.string().required("Phone is required"),
  }),
  dateBirth: yup.string().when("isSignUp", {
    is: true,
    then: yup.string().required("Date of Birth is required"),
  }),
});

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: any) => {
    if (loading) return;

    setLoading(true);
    try {
      if (isSignUp) {
        const { message } = await registerUser(
          data.email,
          data.password,
          data.firstName,
          data.lastName,
          data.phone,
          data.dateBirth
        );
        alert(message);
      } else {
        const { message } = await loginUser(data.email, data.password);
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
      {/* Левая сторона (форма) - светлее */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 bg-deepViolet/60"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <form
          className="p-6 md:p-10 rounded-xl w-full max-w-sm text-center"
          onSubmit={handleSubmit(handleFormSubmit)}
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
              {...register("email")}
              error={errors.email?.message}
            />

            {isSignUp && (
              <>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  Icon={FaRegUserCircle}
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  Icon={FaRegUserCircle}
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  Icon={FaRegUserCircle}
                  {...register("phone")}
                  error={errors.phone?.message}
                />
                <Input
                  type="date"
                  name="dateBirth"
                  placeholder="Date of Birth"
                  Icon={FaRegUserCircle}
                  {...register("dateBirth")}
                  error={errors.dateBirth?.message}
                />
              </>
            )}

            <Input
              type="password"
              name="password"
              placeholder="Password"
              Icon={MdLockOutline}
              {...register("password")}
              error={errors.password?.message}
            />

            {isSignUp && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                Icon={MdLockOutline}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
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
              type="submit"
              disabled={loading}
            />
          </motion.div>

          {!isSignUp && (
            <motion.div className="text-sm mt-2 text-white/60">
              <Link href="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </motion.div>
          )}

          <div className="mt-4 text-white/60">
            {isSignUp ? (
              <p>
                Already have an account?
                <motion.span
                  className="text-softLavender cursor-pointer hover:underline ml-1 inline-block"
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
                  className="text-softLavender cursor-pointer hover:underline ml-1 inline-block"
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

      {/* Правая сторона (инфо) - темнее */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left text-white p-6 md:p-8 bg-deepViolet"
        initial={{ opacity: 0, x: "10%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-softLavender">Manage your tasks effectively with our app</p>
        <h1 className="text-5xl md:text-[6rem] font-bold mt-4">Agenda</h1>
        <p className="text-lg mt-40 text-softLavender">Your assistant in task management</p>
      </motion.div>
    </div>
  );
};

export default Login;

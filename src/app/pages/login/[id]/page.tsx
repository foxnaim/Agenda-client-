import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";



const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Левая часть с формой */}
      <div className="bg-bgop w-1/2 flex items-center justify-center">
        <form className=" p-8 rounded-lg shadow-lg w-80">
          <h1 className="text-center mb-5 text-2xl font-semibold text-white">
            Welcome
          </h1>

          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdOutlineMail}
            />
             <Input
              type="password"
              name="Password"
              placeholder="Password"
              Icon={MdLockOutline}
            />
            <Button name="Login" text="Login" Icon={CiLogin}/>
          </div>
          <div>
           <Link href="">Forgot password?</Link>
           <Link href="">Sign up</Link>
          </div>
          <div className="flex items-center justify-center mt-4 gap-4">
           <div className="border-2 w-10"/>
           <h2>Or</h2>
           <div className="border-2 w-10"/>
          </div>
          <Button name="Google" text="Google" />
        </form>
      </div>

      {/* Правая часть */}
      <div className="w-1/2 bg-dop">
      </div>
    </div>
  );
};

export default Login;

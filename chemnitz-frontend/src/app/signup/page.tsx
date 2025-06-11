"use client";

import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import SignupPage from "@/components/forms/SignupForm";
import Transition from "@/components/general/Transition";
import MainLoginForm from "@/components/forms/MainLoginForm";


export default function LoginPage() {
  const [activeForm, setActiveForm] = useState("main");

  return (
    <div className="max-h-[135rem] h-[100vh] w-full flex justify-center items-center bg-[#dce5f0] ">
      <div className="h-[35rem] w-[50rem] bg-white rounded-[25px] flex mx-6 xs:max-w-[5rem] sm:max-w-[25rem] lg:max-w-[50rem]">
        <div className="hidden w-[52%] p-2 lg:block">
          <img
            src="/assets/image/loginBg.png"
            alt="Login background"
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
        <div className="w-[100%] lg:w-[48%]">
          <div className="px-8 w-full h-full bg-[#ffffff] rounded-[25px] lg:px-15">
            <Transition direction="left">
              <div className="w-full h-full flex align-middle items-center relative">
                {activeForm === "main" && <MainLoginForm setActiveForm={setActiveForm} />}
                {activeForm === "login" && <LoginForm setActiveForm={setActiveForm} />}
                {activeForm === "signup" && <SignupPage setActiveForm={setActiveForm} />}

              </div>
            </Transition>
          </div>
        </div>
      </div>

    </div>
  );
}



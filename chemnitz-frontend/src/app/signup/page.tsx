"use client";

import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "next/navigation";
import SignupPage from "@/components/forms/SignupForm";
import Transition from "@/components/general/Transition";
import { loginUser, signupUser } from "@/lib/auth";


export default function LoginPage() {
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

    const handleSignup = async (name: string, email: string, password: string) => {
        try {
            // Assuming you have a signupUser function that registers a new user and returns a token
            const token = await signupUser(name, email, password);
            sessionStorage.setItem("token", token);
            router.push("/dashboard");
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Signup failed");
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const token = await loginUser(email, password);
            sessionStorage.setItem("token", token);
            router.push("/dashboard");
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    const backgroundStyle = {
        backgroundImage: "url('/assets/image/loginBg.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    if (!showForm) {
        return (
            <div className="max-h-[135rem] h-[100vh] w-full flex justify-center items-center bg-[#dce5f0] ">
               <div className="h-[35rem] w-[50rem] bg-white rounded-[25px] flex">
  <div className="w-[52%] p-2"> 
    <img
      src="/assets/image/loginBg.png"
      alt="Login background"
      className="w-full h-full object-cover rounded-[20px]"
    />
  </div>
  <div className="w-[48%] "> 
    <div className="px-15 w-full h-full bg-[#ffffff] rounded-[25px]">
      <Transition direction="left">
        <SignupPage onSignup={handleSignup} onLogin={handleLogin}/>
      </Transition>
    </div>
  </div>
</div>

            </div>
        );
    }

    return <LoginForm onLogin={handleLogin} />;
}

"use client";

import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import SignupPage from "@/components/forms/SignupForm";


export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

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
      <div className="max-h-[135rem] h-[100vh] w-full flex justify-center items-center bg-[#dce5f0]"  >
        <div className="h-[35rem] w-[60rem] bg-white rounded-[25px] flex " >
          
          <div className="w-[60%]  py-2 px-2  ">
            <img
              className="w-full h-full object-cover rounded-[25px] bg-red-500"
              src="/assets/image/loginBg.png"
            />
          </div>
          <div className="w-[40%] py-2 pl-2">
            <div className="pl-4 w-full h-full bg-[#ffffff] rounded-[25px] ">
              <SignupPage />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // form after button clicked
  return <LoginForm onLogin={handleLogin} />;
}

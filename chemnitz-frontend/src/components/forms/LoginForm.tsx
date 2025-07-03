'use'
import React from 'react'
import Tooltip from "../general/Tooltip";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GreenButton from '../general/GreenButton';
import { useState } from "react";
import { loginUser } from '@/lib/auth';
import { useRouter } from "next/navigation";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';



type Props = {
  setActiveForm: (form: "login" | "signup" | "main") => void;
};


function LoginForm({ setActiveForm }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include", // for cookies/session
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Try to extract server error message if any
        const data = await res.json().catch(() => ({}));
        const message = data.message || "Login failed";
        setError(message);
        throw new Error(message);
      }

      // Successful login
      router.push("/");
    } catch (error: any) {
      setError(error.message || "Login failed");
      // Optional: Log error for debugging
      console.error(error);
    }
  };


  return (

    <div className={`absolute transition-all duration-500 ease-in-out w-full opacity-100 translate-x-0'}`}>
      <div>
        <div className="w-full">
          <div className="absolute">
            <Tooltip content="back">
              <ArrowBackIcon className="cursor-pointer" onClick={() => setActiveForm("main")} />
            </Tooltip>
          </div>
          <h2 className="text-xl font-semibold mb-4 w-full flex justify-center text-[#1c191b]">Log in</h2>
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-[#666666] mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-10 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-900"
                />
              </div>
            </div>



            <div className="mb-4 relative">
              <div className="flex w-full justify-between mb-[2px] text-[rgb(102,102,102)]">
                <label className="block text-sm mb-1">Password</label>
                <div className="flex items-center gap-1 mr-2 cursor-pointer select-none" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? (
                    <VisibilityIcon style={{ fontSize: '15px' }} />
                  ) : (
                    <VisibilityOffIcon style={{ fontSize: '15px' }} />
                  )}
                  <p className="text-[12px] mt-[3px]">{showPassword ? "Hide" : "Show"}</p>
                </div>

              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <VpnKeyIcon style={{ fontSize: '16px' }} className="text-gray-400" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>
            </div>

            <div className='text-[12px]'>
              {error}
            </div>
            <GreenButton label="Log in" handleLogin={handleLogin} />

          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginForm
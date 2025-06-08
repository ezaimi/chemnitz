import Button from "../general/button";
import GoogleButton from "../general/GoogleButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import Tooltip from "../general/Tooltip";
import GreenButton from "../general/GreenButton";
import clsx from 'clsx';


interface SignupFormProps {
    onSignup: (name: string, email: string, password: string) => void;
    onLogin: (name: string, password: string) => void;

}

export default function SignupForm({ onSignup, onLogin }: SignupFormProps) {
    const [activeForm, setActiveForm] = useState<'initial' | 'signup' | 'login'>('initial');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup(name, email, password);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(name, password);
    };

    return (
        <div className="w-full h-full flex align-middle items-center relative">

            {activeForm === 'initial' && (
                <div className="absolute transition-all duration-500 ease-in-out w-full opacity-100 translate-x-0">
                    <div className="flex w-full flex-col gap-y-[3rem]">
                        <div className="flex flex-col w-full items-center text-center mt-[50px]">
                            <p className="text-[28px] font-poppins font-bold mt-[-10px]">
                                Discover{" "}
                                <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,_#7fc081,_#405039)]">
                                    Chemnitz
                                </span>
                            </p>
                            <p className="text-[16px] text-[#a7a5a5]">Join us today</p>
                        </div>
                        <div className="mt-[-20px]">
                            <GoogleButton label="Sign in with Google" />
                            <div className="pt-4 flex items-center text-gray-400 text-sm">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-3 text-gray-700 text-[10px]">OR</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                            <div onClick={() => setActiveForm('signup')} className="my-3 mb-0">
                                <Button label="Sign up with email" />
                            </div>
                            <p className="text-[10px] text-gray-600 mt-0.5 ml-3">
                                By signing up, you agree to the
                                <a href="/terms" className="underline text-gray-700 hover:text-gray-800"> Terms of Service</a>
                                {' '} and{' '}
                                <a href="/privacy" className="underline text-gray-700 hover:text-gray-800">Privacy Policy</a>, including cookie use.
                            </p>
                        </div>
                        <div className="font-normal text-[13px] mt-[-25px]">
                            <div className="flex justify-center mb-3">
                                <p className="text-[#333333] text-[14px]">Already have an account?</p>
                            </div>
                            <div className="flex justify-center">
                                <GreenButton label="Log in" onClick={() => setActiveForm('login')} />
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {activeForm === 'signup' && (
                <div className={`absolute transition-all duration-500 ease-in-out w-full opacity-100 translate-x-0'}`}>
                    <div>
                        <div className="w-full">
                            <div onClick={() => setActiveForm('initial')} className="absolute">
                                <Tooltip content="back">
                                    <ArrowBackIcon className="cursor-pointer" />
                                </Tooltip>
                            </div>
                            <h2 className="text-xl font-semibold mb-4 w-full flex justify-center text-[#1c191b]">Sign in</h2>
                            <form onSubmit={handleSignup}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm text-[#666666] mb-1">Username</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-10 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm text-[#666666] mb-1">Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
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
                                        <div className="flex items-center gap-1 mr-2">
                                            <VisibilityOffIcon style={{ fontSize: '14px' }} />
                                            <p className="text-[12px] mt-[3px]">Hide</p>
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    />
                                </div>

                                <GreenButton label="Sign in" type="submit" />
                            </form>

                            <div className="my-4 flex items-center">
                                <hr className="flex-grow border-gray-300" />
                                <span className="mx-2 text-sm text-gray-400">OR</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            <div>
                                <GoogleButton label="Sign in with google" />
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                By continuing, you agree to the{" "}
                                <a href="/terms" className="underline">Terms of use</a>{" "}
                                and{" "}
                                <a href="/privacy" className="underline">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            )}




            {activeForm === 'login' && (
                <div className={`absolute transition-all duration-500 ease-in-out w-full opacity-100 translate-x-0'}`}>
                    <div>
                        <div className="w-full">
                            <div onClick={() => setActiveForm('initial')} className="absolute">
                                <Tooltip content="back">
                                    <ArrowBackIcon className="cursor-pointer" />
                                </Tooltip>
                            </div>
                            <h2 className="text-xl font-semibold mb-4 w-full flex justify-center text-[#1c191b]">Log in</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm text-[#666666] mb-1">Username</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-10 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-900"
                                        />
                                    </div>
                                </div>



                                <div className="mb-4 relative">
                                    <div className="flex w-full justify-between mb-[2px] text-[rgb(102,102,102)]">
                                        <label className="block text-sm mb-1">Password</label>
                                        <div className="flex items-center gap-1 mr-2">
                                            <VisibilityOffIcon style={{ fontSize: '14px' }} />
                                            <p className="text-[12px] mt-[3px]">Hide</p>
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    />
                                </div>

                                <GreenButton label="Log in" />

                            </form>
                        </div>
                    </div>
                </div>
            )}



        </div>

    );
}

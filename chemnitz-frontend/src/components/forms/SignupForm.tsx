import Button from "../general/button";
import GoogleButton from "../general/GoogleButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import Tooltip from "../general/Tooltip";
import GreenButton from "../general/GreenButton";
import clsx from 'clsx';
import { signupUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { validateName, validateEmail, validatePassword } from "@/lib/validation";



type Props = {
    setActiveForm: (form: "login" | "signup" | "main") => void;
};


export default function SignupForm({ setActiveForm }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [errorMessage, setErrorMessage] = useState("");


    const router = useRouter();


    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const token = await signupUser(name, email, password);
            sessionStorage.setItem("token", token);
            router.push("/dashboard");
        } catch (error: any) {
            console.log("Signup error caught:", error);

            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Signup failed");
            }
        }

    };

    const handleNameBlur = () => {
        const error = validateName(name);
        setErrors((prev) => ({ ...prev, name: error }));
    };

    const handleEmailBlur = () => {
        const error = validateEmail(email);
        setErrors((prev) => ({ ...prev, email: error }));
    };

    const handlePasswordBlur = () => {
        const error = validatePassword(password);
        setErrors((prev) => ({ ...prev, password: error }));
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
                    <h2 className="text-xl font-semibold mb-4 w-full flex justify-center text-[#1c191b]">Sign in</h2>
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm text-[#666666] mb-1">Username</label>
                            <div className="relative ">
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
                                    onBlur={handleNameBlur}
                                    className="w-full px-10 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-900"
                                />

                            </div>
                            {errors.name && <p className=" text-red-900 text-[10px] text-sm mt-1">{errors.name}</p>}
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
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}

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
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <VpnKeyIcon style={{ fontSize: '16px' }} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-10 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm text-gray-900"
                                />
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>
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


    );
}

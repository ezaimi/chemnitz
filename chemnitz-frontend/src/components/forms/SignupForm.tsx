import Button from "../general/button";
import GoogleButton from "../general/GoogleButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import Tooltip from "../general/Tooltip";


export default function SignupPage() {
    const [isSelected, setIsSelected] = useState(false);

    const openForm = (() => {
        setIsSelected(!isSelected);
    })

    return (
        <div className="w-full h-full flex  align-middle items-center relative">
            {!isSelected ?
                (
                    <div className={`absolute transition-all duration-500 ease-in-out w-full ${isSelected ? 'opacity-0 translate-x-[-100%]' : 'opacity-100 translate-x-0'}`}>
                        <div className="flex w-full flex-col gap-y-[3rem] ">
                            <div className="flex flex-col w-full items-start ">
                                <p className="text-[35px]">
                                    Travel with us
                                </p>
                                <p className="text-[30px]">
                                    Join us today
                                </p>
                            </div>
                            <div>
                                <Button
                                    label="Sign in with Google"
                                    startIcon={<img src="/assets/icon/googleicon.png" alt="Google" className="h-4" />}
                                />

                                <div className="pt-4 flex items-center text-gray-400 text-sm">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-3 text-gray-700">OR</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <div onClick={openForm} className="my-3">
                                    <Button label="Sign up with email" />
                                </div>
                                <p className="text-[11px] text-gray-600 mt-1">
                                    By signing up, you agree to the
                                    <a href="/terms" className="underline text-gray-700 hover:text-gray-800"> Terms of Service</a>
                                    {' '} and{' '}
                                    <a href="/privacy" className="underline text-gray-700 hover:text-gray-800" >Privacy Policy</a>, including cookie use.
                                </p>

                            </div>
                            <div className="font-normal text-[13px]">
                                <p className="text-[#333333] mb-1.5">Already have an account?</p>
                                <Button label="Log in" />
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <div className={`absolute transition-all duration-500 ease-in-out w-full ${isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'}`}>
                        <div>
                            <div className="w-full">
                                <div onClick={openForm} className="absolute ">
                                    <Tooltip content="back">
                                        <ArrowBackIcon />
                                    </Tooltip>
                                </div>
                                <h2 className="text-xl font-semibold mb-4 w-full flex justify-center">Sign in</h2>

                                <div className="text-right mb-4">
                                    <a href="#" className="text-sm text-black underline ">
                                        Reset password
                                    </a>
                                </div>

                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm text-[#666666] mb-1">Username</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm text-[#666666] mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        />
                                    </div>

                                    <div className="mb-4 relative">
                                        <div className="flex w-full justify-between mb-[2px] text-[rgb(102,102,102)]">
                                            <label className="block text-sm  mb-1">Password</label>
                                            <div className="flex items-center gap-1 mr-2">
                                                <div>   <VisibilityOffIcon style={{ fontSize: '14px' }} />  </div>
                                                <p className="text-[12px] mt-[3px]">Hide</p>
                                            </div>
                                        </div>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 border border-[#cacaca] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        />
                                    </div>

                                    <Button label="Sign in" />

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
                                    <a href="/terms" className="underline">
                                        Terms of use
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy" className="underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
    );
}

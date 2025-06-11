import React from 'react'
import GreenButton from "../general/GreenButton";
import Button from '../general/button';
import GoogleButton from '../general/GoogleButton';

type Props = {
    setActiveForm: (form: "login" | "signup" | "main") => void;
};

function MainLoginForm({ setActiveForm }: Props) {
    return (

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
                    <div className="my-3 mb-0">
                        <Button label="Sign up with email" onClick={() => setActiveForm("signup")}/>
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
                        <GreenButton onClick={() => setActiveForm("login")} label="Log in" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainLoginForm
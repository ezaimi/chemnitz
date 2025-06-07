import Button from "../general/button";

export default function SignupPage() {
    return (
        <div className="w-full h-full flex  align-middle items-center">
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
                    <button className="px-4 flex py-1.5 border-1 items-center rounded-full w-full justify-center">
                        <div>
                            <img src="/assets/icon/googleicon.png" alt="" className="h-4"/>
                        </div>
                        <p>Sign in with Google</p>
                    </button>
                    <div className="pt-4 flex items-center text-gray-400 text-sm">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <button className="mt-4 px-4 py-1.5 border-[1px] rounded-full w-full">
                        <div></div>
                        <p>Sign up with email</p>
                    </button>
                    <p className="text-[12px]">
                        By signing up, you agree to the Terms
                    </p>
                </div>
                <div>
                    <p>Already</p>
                   <Button label="Login"/>
                </div>
            </div>


        </div>
    );
}

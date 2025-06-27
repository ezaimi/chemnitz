'use client';

import HeaderButton from './HeaderButton';
import Button from '../general/button';
import { useState } from "react";
import { label } from 'framer-motion/client';
import { HeaderItemsType } from '@/types/componentTypes';



// text-transparent bg-clip-text bg-[linear-gradient(to_right,_#7fc081,_#405039)]

interface props {
    headerItems: HeaderItemsType[]
}


export default function Header({headerItems} : props) {

  const [activeItem, setActiveItem] = useState(headerItems[1].label);


    return (
        <header className='px-4 h-[3rem]'>
            <nav className=" lg:px-10  py-0 flex justify-between items-center">

                <div className=' flex-1'><p className=" text-[#1c191b] self-center  text-[20px] font-poppins font-bold whitespace-nowrap " >Discover Chemnitz</p>
                </div> 
                <div className=' flex-1 hidden lg:block '>
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-center">
                       {headerItems.map((item, index) => (
                         <li >
                            <a onClick={() => setActiveItem(item.label)} className={`${activeItem == item.label ? 'text-red-600' : 'text-gray-950' } block cursor-pointer py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0   `}>
                               {item.label}</a>
                        </li>
                        ))}
                       
                    </ul>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-end  py-2">
                    <div className="flex justify-center items-center" >
                        <HeaderButton label="Log In" className=' px-6 py-1.5 text-xs' />
                    </div>
                    <div className="  flex justify-center items-center">
                        <HeaderButton label="Sign In" className=' px-6 py-1.5 text-xs' />
                    </div>
                    <div className='lg:hidden'>
                        more
                    </div>
                </div>

                {/* <div className="flex flex-wrap justify-between items-center max-w-screen-xl bg-amber-200">
                    <p className=" text-[#1c191b] self-center  text-[28px] font-poppins font-bold whitespace-nowrap " >Discover Chemnitz</p>

                    <div className="flex items-center lg:order-2">
                        <Button label='Log In' />
                        <Button label='Sign In' />
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#1c191b]  dark:hover:bg-gray-700 dark:hover:text-[#1c191b]  lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#1c191b] dark:hover:bg-gray-700 dark:hover:text-[#1c191b] lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#1c191b] dark:hover:bg-gray-700 dark:hover:text-[#1c191b] lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#1c191b] dark:hover:bg-gray-700 dark:hover:text-[#1c191b] lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#1c191b] dark:hover:bg-gray-700 dark:hover:text-[#1c191b] lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </nav>
        </header>
    )
}

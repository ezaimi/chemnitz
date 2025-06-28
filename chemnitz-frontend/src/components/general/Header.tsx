'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import HeaderButton from './HeaderButton';
import Menu from './Menu';
import {  MenuItemType } from '@/types/componentTypes';

export const menuItemData: MenuItemType[] = [
 { label: 'Home' },
  { label: 'About' },
  { label: 'Attractions' },
  { label: 'Map' },
  { label: 'Contact' }

];

interface Props {
  headerItems?: MenuItemType[];
}

export default function Header({ headerItems }: Props) {
  const itemsToRender = headerItems ?? menuItemData;
  const [activeItem, setActiveItem] = useState(itemsToRender[0].label);
  const router = useRouter();

  return (
    <header className="px-4 h-[3rem]">
      <nav className="lg:px-10 py-0 flex justify-between items-center h-full">

        <div className="flex-1 flex">
          <img src="/assets/icon/headericon.png" alt="" className="w-14" />
          <p className="text-[#1c191b] self-center font-poppins font-bold whitespace-nowrap text-[20px] hidden sm:flex">
            Discover Chemnitz
          </p>
        </div>

        <div className="flex-1 hidden lg:block">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-center">
            {itemsToRender.map((item, index) => (
              <li key={index}>
                <a
                  onClick={() => setActiveItem(item.label)}
                  className={`${
                    activeItem === item.label
                      ? 'text-[#617d4d]'
                      : 'text-gray-700'
                  } block cursor-pointer py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end sm:gap-4">
          <div className="flex justify-center items-center whitespace-nowrap">
            <HeaderButton
              label="Log In"
              className="px-6 py-1.5 text-xs"
              onClick={() => router.push("/signup")}
            />
          </div>

          <div className="flex justify-center items-center whitespace-nowrap">
            <HeaderButton
              label="Sign In"
              className="px-6 py-1.5 text-xs"
              onClick={() => router.push("/signup?form=signup")}
            />
          </div>

          <div className="lg:hidden flex items-center align-middle">
            <Menu
              menuItems={itemsToRender}
              MenuIconComponent={<MenuOutlinedIcon />}
              position="right"
              backgroundColor="bg-black"
              textColor="text-white"
              selectedColor="text-[#617d4d]"
            />
          </div>
        </div>

      </nav>
    </header>
  );
}

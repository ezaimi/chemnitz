'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import HeaderButton from './HeaderButton';
import Menu from './Menu';
import { MenuItemType } from '@/types/componentTypes';
import { useUser } from "../AuthPage";

import { User } from '@/types/User';


export const menuItemData: MenuItemType[] = [
  { label: 'Home' },
  { label: 'About' },
  { label: 'Attractions' },
  { label: 'Map' },
  { label: 'Contact' }

];


interface Props {
  headerItems?: MenuItemType[];
  user?: User | null;

}


export default function Header({ headerItems, user }: Props) {
  const itemsToRender = headerItems ?? menuItemData;
  const [activeItem, setActiveItem] = useState(itemsToRender[0].label);
  const router = useRouter();
  const { user: contextUser, setUser } = useUser();

  async function handleLogout() {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
      if (!res.ok) {
        throw new Error('Logout failed');
      }
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Please try again.");
    }
  }


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
            {itemsToRender.map((item) => (
              <li key={item.label}>  {/* Use item.label as the key */}
                <a
                  onClick={() => setActiveItem(item.label)}
                  className={`${activeItem === item.label
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
          {contextUser ? (
            <>
              <HeaderButton
                label="Log Out"
                className="px-6 py-1.5 text-xs"
                onClick={handleLogout}
              />
              <HeaderButton
                label="Profile"
                className="px-6 py-1.5 text-xs"
                onClick={() => router.push("/userProfile")}
              />
            </>
          ) : (
            <>
              <HeaderButton
                label="Log In"
                className="px-6 py-1.5 text-xs "
                onClick={() => {
                  console.log('here')
                  router.push("/signup")
                }}
              />
              <HeaderButton
                label="Sign In"
                className="px-6 py-1.5 text-xs"
                onClick={() => router.push("/signup?form=signup")}
              />
            </>
          )}
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

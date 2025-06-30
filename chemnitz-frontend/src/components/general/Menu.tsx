import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Link from "next/link";
import { MenuItemType } from '@/types/componentTypes';

interface MenuProps {
  menuItems: MenuItemType[];
  MenuIconComponent: ReactNode;
  position?: 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  selectedColor?: string;
}

function Menu({
  menuItems,
  MenuIconComponent,
  position = 'right',
  backgroundColor = 'bg-gray-800',
  textColor = 'text-white',
  selectedColor = 'text-[#df6c36]'
}: MenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0].label);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleItemClick = (target: string) => {
    setActiveItem(target);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div className="relative flex items-center z-50" ref={menuRef}>
      <button
        className="inline-flex items-center text-sm font-medium text-center"
        onClick={toggleDropdown}
      >
        {MenuIconComponent}
      </button>

      <div
        className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} 
        absolute top-full ${positionClass} mt-2 backdrop-filter backdrop-blur-2xl
        divide-y divide-gray-700 rounded-lg shadow-sm w-44 
        ${backgroundColor}`}
      >
        <ul className="py-2">
          {menuItems.map((item) => (
            <li key={item.target}>
              <Link
                href={`#${item.target}`}
                onClick={() => handleItemClick(item.label)}
                className={`block px-4 py-2 transition-colors duration-200 
        ${activeItem === item.label ? selectedColor : `${textColor} hover:text-gray-300`}`}
              >
                <div className='flex gap-2'>
                  <div></div>
                  <div>{item.label}</div>
                </div>
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default Menu;


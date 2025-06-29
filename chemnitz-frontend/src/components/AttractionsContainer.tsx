'use client';


import React, { useState, useRef } from 'react';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';
import Search from './general/Search';
import PaginationSize from './general/Pagination';
import Filter from './general/Filter';
import Menu from './general/Menu';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { MenuItemType } from '@/types/componentTypes';
import CustomCard from './Card';
import CardGridWithPagination from './CardGridWithPagination';
import Map from './map/Map';




export const menuItemData: MenuItemType[] = [
    { label: '1' },
    { label: '2' },
    { label: '3' },

];

interface Props {
    headerItems?: MenuItemType[];
}

export default function AttractionsContainer({ headerItems }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showWhiteBox, setShowWhiteBox] = useState(false);
    const itemsToRender = headerItems ?? menuItemData;



    return (
        <div className=''>
            <div className=' flex justify-center font-bold text-3xl p-5'>Attractions</div>

            <div className=' h-15 flex items-center px-2 md:px-10  py-2'>
                <div className=' w-full h-full flex items-center justify-between '>
                    <div className='hidden sm:block'>
                        <Filter />
                    </div>

                    <div className='block sm:hidden'> <Menu
                        menuItems={itemsToRender}
                        MenuIconComponent={<MenuOutlinedIcon />}
                        position="left"
                        backgroundColor="bg-black"
                        textColor="text-white"
                        selectedColor="text-[#617d4d]"
                    /></div>

                    <div><Search /></div>

                </div>
            </div>

            <div className=' w-full h-140 px-2 md:px-10 py-5 flex flex-col '>
                <CardGridWithPagination />
            </div>

            <div className='w-full min-h-[250px] p-10 flex flex-col gap-4 px-2 pt-3 h-[800px]'>
                <div className="flex-1 w-full relative p-10 ">
                    <Map />
                </div>
            </div>
        </div>
    );
}

import React from 'react'
import Filter from './Filter'
import Menu from '../general/Menu';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Search from '../general/Search';
import { MenuItemType } from '@/types/componentTypes';

const itemsToRender:MenuItemType[] = [
    { label: '1' },
    { label: '2' },
    { label: '3' }
];

interface HeaderContainerProps {
    onFilterChange: (category: string) => void;
}
function HeaderContainer({ onFilterChange }:HeaderContainerProps) {
    return (
        <div className="w-full h-full flex items-center justify-between">
            <div className="hidden lg:block">
                <Filter onFilterChange={onFilterChange} /> {/* Pass handler to Filter */}
            </div>

            <div className="block lg:hidden">
                <Menu
                    menuItems={itemsToRender}
                    MenuIconComponent={<MenuOutlinedIcon />}
                    position="left"
                    backgroundColor="bg-black"
                    textColor="text-white"
                    selectedColor="text-[#617d4d]"
                />
            </div>

            <div><Search /></div>
        </div>
    )
}

export default HeaderContainer
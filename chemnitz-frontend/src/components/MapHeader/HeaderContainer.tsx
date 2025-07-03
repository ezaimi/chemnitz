import React from 'react';
import Filter from './Filter';
import Search from '../general/Search';

interface HeaderContainerProps {
  onFilterChange: (category: string) => void;
  onSuggestionSelect: (featureId: string) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string | null;
}
function HeaderContainer({
  onFilterChange,
  onSuggestionSelect,
  searchValue,
  onSearchChange,
  selectedCategory,
}: HeaderContainerProps) {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="hidden lg:block">
        <Filter
          onFilterChange={onFilterChange}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="block lg:hidden"></div>
      <div>
        <Search
          onSuggestionSelect={onSuggestionSelect}
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}

export default HeaderContainer;

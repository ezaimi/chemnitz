import { getFuzzySearchSuggestions } from '@/api/featureApi';
import React, { useState, useRef } from 'react';

interface Suggestion {
  id: string;
  name: string;
}

interface SearchProps {
  onSuggestionSelect: (featureId: string) => void;
}

export default function Search({ onSuggestionSelect }: SearchProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Suggestion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch suggestions as user types
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 1) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    try {
      const res = await getFuzzySearchSuggestions(value);
      if (res && res.length > 0) {
        setResults(res);
        setIsDropdownOpen(true);
      } else {
        setResults([]);
        setIsDropdownOpen(false);
      }
    } catch {
      setResults([]);
      setIsDropdownOpen(false);
    }
  };

  // Hide dropdown when not focused
  const handleBlur = () => setTimeout(() => setIsDropdownOpen(false), 100);
  const handleFocus = () => {
    if (results.length) setIsDropdownOpen(true);
  };

  return (
    <div className="relative max-w-[15rem] mx-auto">
      <form className="flex items-center" onSubmit={e => e.preventDefault()}>
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            id="simple-search"
            className="bg-gray-50 border-2 border-black text-gray-900 text-sm rounded-3xl block w-full ps-10 p-2.5 focus:outline-none focus:ring focus:ring-emerald-700"
            placeholder="Search"
            autoComplete="off"
            value={search}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </div>
      </form>
      {isDropdownOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {results.map((item, i) => (
            <div
              key={item.id || i}
              className="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
              onMouseDown={() => {
                setSearch(item.name);
                setIsDropdownOpen(false);
                onSuggestionSelect(item.id);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

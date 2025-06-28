'use client';


import React, { useState, useRef } from 'react';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';

export default function AttractionsContainer() {
      const containerRef = useRef<HTMLDivElement>(null);
  const [showWhiteBox, setShowWhiteBox] = useState(false);

  return (
    <div className=''>
      <div className='bg-amber-500 flex justify-center font-bold text-3xl p-5'>Attractions</div>

      <div className='bg-red-400 h-15 flex items-center pt-2 pb-2'>
        <div className='bg-white w-full h-full flex items-center justify-between pl-10 pr-10'>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>

      <div className='bg-green-400 w-full h-120 p-10'>Attractions</div>

      <div className='bg-yellow-300 w-full min-h-[250px] p-10 flex flex-col gap-4 px-2 pt-3'>
        <div className='bg-pink-300 p-2 rounded-2xl flex flex-col sm:flex-row items-start sm:items-stretch gap-4 w-full h-[600px] relative'>
          <div className="flex-1">here</div>

          <button
            onClick={() => setShowWhiteBox(!showWhiteBox)}
            className="bg-white text-black px-4 py-2 rounded-md shadow max-h-10"
          >
            Toggle Box
          </button>

          <div className={`
            transition-all duration-500 ease-in-out h-50 bg-white rounded-md
            
            ${showWhiteBox ? 'opacity-100 scale-100' : 'opacity-0 scale-95 max-h-0'}
            w-full sm:w-100
            sm:ml-auto
            sm:self-stretch
            sm:h-full
          `}>
            box
          </div>
        </div>
      </div>
    </div>
  );
}

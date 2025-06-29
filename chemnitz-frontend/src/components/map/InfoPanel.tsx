import React from 'react';

function InfoPanel({ isPanelOpen }: { isPanelOpen: boolean }) {
 return (
  <div
   className={`
    absolute z-[900] p-3 shadow-lg overflow-hidden
    bottom-0 w-full h-full
    md:top-0 md:right-0 md:h-full md:w-[30rem]
    transition-opacity duration-1000 ease-in-out
    ${isPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
   `}
  >
   <div className="h-full w-full bg-white rounded-2xl">
    <div className="p-6">
     <h2 className="text-xl font-semibold">Info Panel</h2>
     <p className="mt-2 text-sm text-gray-600">Add your content here...</p>
    </div>
   </div>
  </div>
 );
}

export default InfoPanel;


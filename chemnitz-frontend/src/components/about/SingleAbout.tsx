// SingleAbout.tsx
import React from 'react';

interface SingleAboutProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SingleAbout({ icon, title, description }: SingleAboutProps) {
  return (
    <div className="flex flex-col items-center gap-y-4 font-poppins text-gray-800 sm:max-w-[20rem]">
      <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-full p-6">
        {icon}
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-center text-sm leading-relaxed text-gray-600 px-2">
        {description}
      </div>
    </div>
  );
}

export default SingleAbout;
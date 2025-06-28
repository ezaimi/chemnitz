// About.tsx
import React from 'react';
import SingleAbout from './SingleAbout';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PublicIcon from '@mui/icons-material/Public';

function About() {
  const aboutData = [
    {
      icon: <AccessibilityNewIcon />,
      title: 'Human-Centered',
      description: 'We focus on improving lives with meaningful designs and thoughtful solutions. We focus on improving lives with meaningful designs and thoughtful solutions.',
    },
    {
      icon: <AccessibilityNewIcon />,
      title: 'Sustainable Future',
      description: 'Creating products that respect the planet and promote long-term value. Creating products that respect the planet and promote long-term value.',
    },
    {
      icon: <PublicIcon />,
      title: 'Global Impact',
      description: 'Connecting cultures and communities through inclusive experiences. Connecting cultures and communities through inclusive experiences.',
    },
  ];

  return (
    <div className='flex justify-center w-full'>
      <div className="flex flex-col justify-center w-full items-center px-4 lg:px-10 max-w-7xl align-middle">
        <div className="flex flex-col items-center relative">
          <div className="relative z-10 flex flex-col items-center">
            <p>Hello hello</p>
            <p className="mt-3 text-[30px] font-semibold text-[#202020]">Check out</p>
            <p className="text-[30px] font-semibold text-[#202020]">Our Marketplace</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-6 relative z-10 mt-6 flex-col sm:flex-row lg:-mt-14">
          {aboutData.slice(0, 2).map((item, index) => (
            <div key={index} className='mt-4'>
              <SingleAbout {...item} />
            </div>
          ))}
        </div>

        <div className="mt-14 z-10 w-full flex justify-center lg:-mt-20">
          <SingleAbout {...aboutData[2]} />
        </div>
      </div>
    </div>
  );
}

export default About;
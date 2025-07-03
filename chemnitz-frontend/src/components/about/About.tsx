// About.tsx
import React from 'react';
import SingleAbout from './SingleAbout';
import MapIcon from '@mui/icons-material/Map';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';

function About() {
  const aboutData = [
    {
      icon: <MapIcon fontSize="large" />,
      title: 'Explore Chemnitz’s Attractions',
      description:
        'Discover all that Chemnitz has to offer! Browse a curated collection of the city’s most exciting attractions, from historic landmarks and museums to street art and scenic parks.',
    },
    {
      icon: <CategoryIcon fontSize="large" />,
      title: 'Find What Interests You',
      description:
        'Looking for something specific? Filter attractions by category—restaurants, museums, public art, green spaces, and more. Easily find the places that match your travel style.',
    },
    {
      icon: <StarIcon fontSize="large" />,
      title: 'Save Your Favorites',
      description:
        'Create your personal travel profile! Mark your favorite spots and build your must-see list. Access your favorites anytime and plan the perfect Chemnitz visit.',
    },
  ];

  return (
    <div className='flex justify-center w-full'>
      <div className="flex flex-col justify-center w-full items-center px-4 lg:px-10 max-w-7xl align-middle">
        <div className="flex flex-col items-center relative">
          <div className="relative z-10 flex flex-col items-center">
            {/* You can personalize the intro message */}
            <p className="mt-3 text-[30px] font-semibold text-[#202020]">Explore</p>
            <p className="text-[30px] font-semibold text-[#202020]">Chemnitz with Us</p>
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

export default About;

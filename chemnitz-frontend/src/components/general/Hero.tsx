'use client';

import { useState, useEffect } from 'react';

const images = [
  '/assets/image/main/chemnitz-foto1.png',
  '/assets/image/main/chemnitz-foto2.png',
  '/assets/image/main/chemnitz-foto3.png',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative h-[calc(100vh-3rem)] p-3 pt-0 overflow-hidden ">
      <div className=" absolute inset-0  rounded-2xl overflow-hidden left-3 right-3 bottom-3 ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 p-3 bg-cover bg-center transition-all duration-[4000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
              ${index === currentImageIndex ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'}
            `}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>


      <section className="relative z-20 w-full h-full flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[100%] h-[100%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0)_70%)]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl px-4">
          <p className="text-3xl font-serif">It's time to</p>
          <p className="text-5xl sm:text-6xl font-serif mt-2">Visit Chemnitz</p>
          <p className="text-sm mt-4 font-serif text-[#eae4e4]">
            A place where nature and adventure unite. A place where nature and
            adventure unite. A place where nature and adventure unite. A place where
            nature and adventure unite. A place where nature and adventure unite.
          </p>
          <button
            className="mt-8 text-white border px-14 py-3 rounded-full text-sm font-semibold shadow-lg cursor-pointer hover:bg-white hover:text-black hover:border-transparent"
            onClick={() => {
              const section = document.getElementById('attractions');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            See Attractions
          </button>

        </div>
      </section>
    </main>
  );
}

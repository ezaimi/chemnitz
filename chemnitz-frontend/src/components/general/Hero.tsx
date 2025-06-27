

export default function Hero() {
  return (

    <main className="h-[calc(100vh-3rem)] p-3 ">

      <div
        className="bg-cover bg-center h-full w-full rounded-2xl"
        style={{ backgroundImage: `url('/assets/image/chbg.png')` }}
      >
         <section className="h-full flex flex-col justify-center px-10 text-white text-left max-w-4xl">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          Explore the sights<br />
          of the Azores
        </h1>
        <p className="text-lg mt-4">A place where nature and adventure unite</p>
        <button className="mt-8 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-gray-100 transition">
          Book now
        </button>
      </section>
        </div>
        </main>

    // <main className="relative h-screen overflow-hidden">
    //   {/* Background Image */}
    //   <div className="absolute inset-0 -z-10">
    //     <img
    //       src="/assets/image/chbg.png"
    //       alt="Azores landscape"
    //       className="object-cover "
    //     />
    //   </div>

    //   {/* Hero Content */}
      // <section className="h-full flex flex-col justify-center px-10 text-white text-left max-w-4xl">
      //   <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
      //     Explore the sights<br />
      //     of the Azores
      //   </h1>
      //   <p className="text-lg mt-4">A place where nature and adventure unite</p>
      //   <button className="mt-8 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-gray-100 transition">
      //     Book now
      //   </button>
      // </section>

    //   {/* Scroll Indicator */}
    //   <div className="absolute bottom-6 right-6 flex items-center space-x-2 text-white text-sm">
    //     <span>Scroll down</span>
    //     <div className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
    //       <svg
    //         className="w-4 h-4"
    //         fill="none"
    //         stroke="white"
    //         strokeWidth="2"
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
    //       </svg>
    //     </div>
    //   </div>
    // </main>
  );
}

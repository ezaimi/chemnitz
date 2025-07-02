// src/components/general/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full  border-t border-[#e8ede9] shadow-lg rounded-t-3xl md:rounded-none ">
      <div className="px-20 py-8 flex flex-col pl-40 md:flex-row items-center md:justify-between gap-10">
        {/* Logo and site name */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/icon/headericon.png"
            alt="Discover Chemnitz"
            className="w-10 h-10 rounded-full border-2 border-green-500 shadow"
          />
          <span className="text-lg font-bold text-gray-800">Discover Chemnitz</span>
        </div>

         <div className="flex gap-5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-50 hover:bg-green-100 transition p-2 shadow"
          >
            {/* Instagram SVG */}
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#22c55e" fillOpacity="0.12"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Zm1.5-4.87h.01" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="#22c55e" strokeWidth="1.4"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-50 hover:bg-green-100 transition p-2 shadow"
          >
            {/* Facebook SVG */}
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#22c55e" fillOpacity="0.12"/>
              <path d="M15 8h2V5.5A2.5 2.5 0 0 0 14.5 3H12A5 5 0 0 0 7 8v3H5v3h2v7h3v-7h2l1-3h-3V8a2 2 0 0 1 2-2h2z" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="mailto:contact@discover-chemnitz.de"
            className="rounded-full bg-green-50 hover:bg-green-100 transition p-2 shadow"
          >
            {/* Email SVG */}
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#22c55e" fillOpacity="0.12"/>
              <path d="M4 8v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Zm2.29 1.71 5.3 3.29a1 1 0 0 0 1.18 0l5.3-3.29" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Friendly message and contact */}
        <div className="flex flex-col items-center md:items-start ">
          <p className="text-gray-700 text-sm font-medium mb-1">
            Made for travelers & locals exploring Chemnitz.
          </p>
          <a
            href="mailto:contact@discover-chemnitz.de"
            className="text-green-600 hover:text-green-700 text-xs font-semibold transition"
          >
            contact@discover-chemnitz.de
          </a>
        </div>

        {/* Social icons */}
       
      </div>
     
      <div className="text-xs text-gray-400 text-center pb-4">
        &copy; {new Date().getFullYear()} Discover Chemnitz. All rights reserved.
      </div>
    </footer>
  );
}

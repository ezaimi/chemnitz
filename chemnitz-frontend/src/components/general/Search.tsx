import React from 'react'

export default function Search() {
    return (
        <div>
            <form className="flex items-center max-w-[10rem] sm:max-w-[10rem] md:max-w-[10rem] lg:max-w-[15rem] mx-auto">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border-2 border-black text-gray-900 text-sm rounded-3xl block w-full ps-10 p-2.5 focus:outline-none focus:ring focus:ring-emerald-700" placeholder="Search" required />
                </div>
               
            </form>
        </div>
    )
}

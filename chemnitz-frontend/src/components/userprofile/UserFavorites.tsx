import React from 'react'
import { useState } from "react";


const favourites = [
    {
        id: "way/23757830",
        title: "Sächsisches Eisenbahnmuseum",
        description: "One of the largest railway museums in Germany.",
        image: "/assets/image/loginBg.png",
        link: "https://www.sem-chemnitz.de/",
    },
    {
        id: "way/102957382",
        title: "Restaurant Villa Esche",
        description: "Historic restaurant with classic Saxon cuisine.",
        image: "/assets/image/loginBg1.png",
        link: "http://www.restaurant-villaesche.de/",
    },
];

export default function UserFavorites() {

    const [favs, setFavs] = useState(favourites);



    return (
        <>
            {favs.length === 0 ? (
                <div className="col-span-full text-gray-500 italic">No favorites yet. Start exploring Chemnitz!</div>
            ) : (
                favs.map((fav) => (
                    <a
                        key={fav.id}
                        href={fav.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col overflow-hidden border border-transparent hover:border-green-400"
                    >
                        <img
                            src={fav.image}
                            alt={fav.title}
                            className="h-40 w-full object-cover group-hover:scale-105 transition"
                        />
                        <div className="flex-1 flex flex-col p-5">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600">{fav.title}</h3>
                                <button
                                    className="ml-2 p-1 bg-black/5 hover:bg-green-100 rounded-full transition"
                                    aria-label="Remove from favorites"
                                    onClick={e => {
                                        e.preventDefault();
                                        setFavs((prev) => prev.filter((item) => item.id !== fav.id));
                                    }}
                                >
                                    <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
                                        <path d="M6 6l8 8M6 14L14 6" stroke="#18181b" strokeWidth={2} strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-gray-600 mt-2 mb-3 line-clamp-2">{fav.description}</p>
                            <span className="inline-block text-green-700 text-xs font-medium bg-green-100 rounded-full px-3 py-1 mt-auto self-start">Explore</span>
                        </div>
                    </a>
                ))
            )}
        </>
    )
}

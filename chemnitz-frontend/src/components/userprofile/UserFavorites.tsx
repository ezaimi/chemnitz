'use client';
import React, { useState, useEffect, useRef } from "react";
import { getFeatureById } from "@/api/featureApi";
import { Feature } from '@/types/Features';
import Map from "@/components/map/Map";
import { useUser } from "../AuthPage";
import CustomCard from "../Card";
import { Pagination } from "@mui/material";

// Hook to get responsive cards per page
function useCardsPerPage() {
  const [cards, setCards] = useState(3);

  useEffect(() => {
    function updateCards() {
      // You can adjust this breakpoint to match your Tailwind config (md = 768px)
      if (window.innerWidth < 768) {
        setCards(3);
      } else {
        setCards(6);
      }
    }
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);
  return cards;
}

export default function UserFavorites() {
    const { user: contextUser, setUser } = useUser();
    const [favorites, setFavorites] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const CARDS_PER_PAGE = useCardsPerPage();
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchUserFavorites() {
            setLoading(true);
            if (contextUser && contextUser.favorites && contextUser.favorites.length > 0) {
                const favs = await Promise.all(
                    contextUser.favorites.map(async (id: string) => {
                        try {
                            const feature = await getFeatureById(id);
                            return feature;
                        } catch {
                            return null;
                        }
                    })
                );
                setFavorites(favs.filter(Boolean) as Feature[]);
            } else {
                setFavorites([]);
            }
            setLoading(false);
        }
        fetchUserFavorites();
    }, [contextUser]);

    const refreshFavorites = async () => {
  if (contextUser && contextUser.favorites && contextUser.favorites.length > 0) {
    const favs = await Promise.all(
      contextUser.favorites.map(async (id: string) => {
        try {
          const feature = await getFeatureById(id);
          return feature;
        } catch {
          return null;
        }
      })
    );
    setFavorites(favs.filter(Boolean) as Feature[]);
  } else {
    setFavorites([]);
  }
};


    const handleLocationClick = (featureId: string) => {
        setSelectedFeatureId(featureId);
        if (mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pageCount = Math.ceil(favorites.length / CARDS_PER_PAGE);
    const paginatedFavorites = favorites.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

    if (loading) return <div>Loading favorites...</div>;

    return (
        <div className="w-full">
            {favorites.length === 0 ? (
                <div className="col-span-full text-gray-500 italic">
                    No favorites yet. Start exploring Chemnitz!
                </div>
            ) : (
                <>
                    <div className="w-full px-2 md:px-10 py-5">
                        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedFavorites.map((feature) => (
                                <div className="flex justify-center" key={feature.id}>
                                    <CustomCard
                                        features={feature}
                                        selectedCategory={""}
                                        onLocationClick={() => handleLocationClick(feature.id)}
                                        contextUser={contextUser}
                                        setUser={setUser}
                                          onReviewSubmitted={refreshFavorites}  // <--- add this line!

                                        
                                    />
                                </div>
                            ))}
                        </div>
                        {pageCount > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    count={pageCount}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    color="primary"
                                    shape="rounded"
                                />
                            </div>
                        )}
                    </div>
                    <div ref={mapRef} className="w-full mt-8 h-[30rem] rounded-xl overflow-hidden border border-gray-200">
                        <Map features={favorites} selectedFeatureId={selectedFeatureId} />
                    </div>
                </>
            )}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import DogCard from "@/components/search/dog-card";
import useStore from "@/lib/store";
import NextPage from "@/components/search/next-page";
import PreviousPage from "@/components/search/previous-page";
import Sort from "@/components/search/sort";
import BreedFilter from "@/components/search/breed-filter";
import Favorites from "@/components/search/favorites";

export default function Search() {
  const dogs = useStore((state) => state.dogs);
  const fetchDogs = useStore((state) => state.fetchDogs);
  const results = useStore((state) => state.results);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return (
    <div className="flex flex-col items-center bg-neutral-50">
      <div className="flex flex-col items-center max-w-7xl w-full px-8 border space-y-8 pt-12 bg-white min-h-screen">
        <div className="text-2xl font-bold">Browse Dogs</div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between w-full px-8 lg:px-14">
          <div className="flex flex-col items-start md:flex-row space-y-4 md:space-y-0 md:items-center space-x-12">
            <BreedFilter />
            <Sort />
          </div>
          <div className="text-muted-foreground">
            {results} result{results !== 1 && "s"}
          </div>
        </div>
        <div className="flex items-center space-x-12">
          <div
            className={`cursor-pointer ${
              !showFavorites &&
              "font-bold underline underline-offset-2 decoration-2"
            }`}
            onClick={() => setShowFavorites(false)}
          >
            All Dogs
          </div>
          <div
            className={`cursor-pointer ${
              showFavorites &&
              "font-bold underline underline-offset-2 decoration-2"
            }`}
            onClick={() => setShowFavorites(true)}
          >
            Favorites
          </div>
        </div>
        {showFavorites ? (
          <Favorites />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        )}
        {!showFavorites && (
          <div className="flex justify-between space-x-8 pt-4 pb-16">
            <PreviousPage />
            <NextPage />
          </div>
        )}
      </div>
    </div>
  );
}

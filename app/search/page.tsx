"use client";

import { useEffect } from "react";
import DogCard from "@/components/search/dog-card";
import useStore from "@/lib/store";
import NextPage from "@/components/search/next-page";
import PreviousPage from "@/components/search/previous-page";
import Favorites from "@/components/search/favorites";
import Sort from "@/components/search/sort";
import BreedFilter from "@/components/search/breed-filter";

export default function Search() {
  const dogs = useStore((state) => state.dogs);
  const fetchDogs = useStore((state) => state.fetchDogs);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return (
    <div className="flex flex-col items-center bg-neutral-50">
      <div className="flex flex-col items-center max-w-7xl w-full px-8 border space-y-8 pt-12 bg-white">
        <div className="text-2xl font-bold">Browse Dogs</div>
        <div className="flex items-center justify-between w-full px-14">
          <div className="flex items-center space-x-12">
            <BreedFilter />
            <Sort />
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-muted-foreground">
              {dogs.length} result{dogs.length !== 1 && "s"}
            </div>
            <Favorites />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
        <div className="flex justify-between space-x-8 pt-4 pb-16">
          <PreviousPage />
          <NextPage />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import DogCard from "@/components/search/dog-card";
import useStore from "@/lib/store";
import NextPage from "@/components/search/next-page";
import PreviousPage from "@/components/search/previous-page";

export default function Search() {
  const dogs = useStore((state) => state.dogs);
  const fetchDogs = useStore((state) => state.fetchDogs);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Browse Dogs</h1>
      <div>
        {dogs.length} result{dogs.length !== 1 && "s"}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
      <PreviousPage />
      <NextPage />
    </div>
  );
}

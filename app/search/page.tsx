"use client";

import { useEffect, useState } from "react";
import { Dog, SearchResponse } from "@/types";
import DogCard from "@/components/search/dog-card";

export default function Search() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      // Fetch dogs from the search route
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/search",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data: SearchResponse = await response.json();

      // Get full dog data from the dogs route
      const dogData = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data.resultIds),
        },
      );

      const dogs: Dog[] = await dogData.json();

      // Set the dogs being displayed
      setDogs(dogs);
    };

    fetchDogs();
  }, []);

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
    </div>
  );
}

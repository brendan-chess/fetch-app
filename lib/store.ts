import { create } from "zustand";
import { Dog, SearchResponse } from "@/types";

interface DogState {
  dogs: Dog[];
  next: string | undefined;
  prev: string | undefined;
  setDogs: (dogs: Dog[]) => void;
  setNext: (next: string) => void;
  setPrev: (prev: string) => void;
  fetchDogs: (query?: string) => void;
}

const useStore = create<DogState>()((set) => ({
  dogs: [],
  next: undefined,
  prev: undefined,
  setDogs: (dogs: Dog[]) => set({ dogs }),
  setNext: (next: string) => set({ next }),
  setPrev: (prev: string) => set({ prev }),
  fetchDogs: async (query = "/dogs/search") => {
    // Fetch dogs from the search route
    const response = await fetch(
      `https://frontend-take-home-service.fetch.com${query}`,
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
    set({ dogs });
    set({ next: data.next });
    set({ prev: data.prev });
  },
}));

export default useStore;

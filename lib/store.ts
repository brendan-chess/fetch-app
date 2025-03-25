import { create } from "zustand";
import { Dog, SearchResponse } from "@/types";

interface DogState {
  dogs: Dog[];
  next: string | undefined;
  prev: string | undefined;
  sortField: "name" | "age" | "breed";
  sortOrder: "asc" | "desc";
  favorites: Dog[];
  match: Dog | null;
  setDogs: (dogs: Dog[]) => void;
  setNext: (next: string) => void;
  setPrev: (prev: string) => void;
  setSortField: (field: "name" | "age" | "breed") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dog: Dog) => void;
  fetchDogs: (page?: "next" | "prev") => void;
  findMatch: () => void;
}

const useStore = create<DogState>()((set, get) => ({
  dogs: [],
  next: undefined,
  prev: undefined,
  sortField: "breed",
  sortOrder: "asc",
  favorites: [],
  match: null,
  setDogs: (dogs: Dog[]) => set({ dogs }),
  setNext: (next: string) => set({ next }),
  setPrev: (prev: string) => set({ prev }),
  setSortField: (field: "name" | "age" | "breed") => set({ sortField: field }),
  setSortOrder: (order: "asc" | "desc") => set({ sortOrder: order }),
  addFavorite: (dog: Dog) =>
    set((state) => ({ favorites: [...state.favorites, dog] })),
  removeFavorite: (dog: Dog) =>
    set((state) => ({
      favorites: state.favorites.filter((d) => d.id !== dog.id),
    })),
  fetchDogs: async (page?: "next" | "prev") => {
    const { next, prev, sortField, sortOrder } = get();
    const query = page
      ? page === "next"
        ? next
        : prev
      : `/dogs/search?sort=${sortField}:${sortOrder}&size=30`;

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
    set({ dogs, next: data.next, prev: data.prev });
  },
  findMatch: async () => {
    const favorites = get().favorites;

    if (favorites.length < 1) {
      return;
    }

    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/match",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(favorites.map((dog) => dog.id)),
      },
    );

    const data: { match: string } = await response.json();

    set({
      match: favorites.find((dog) => dog.id === data.match) ?? null,
      favorites: [],
    });
  },
}));

export default useStore;

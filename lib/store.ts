import { create } from "zustand";
import { Dog, SearchResponse } from "@/types";
import { redirect } from "next/navigation";

interface DogState {
  dogs: Dog[];
  next: string | undefined;
  prev: string | undefined;
  sortField: "name" | "age" | "breed";
  sortOrder: "asc" | "desc";
  results: number;
  favorites: Dog[];
  match: Dog | null;
  breeds: string[];
  breed: string;
  setDogs: (dogs: Dog[]) => void;
  setNext: (next: string) => void;
  setPrev: (prev: string) => void;
  setSortField: (field: "name" | "age" | "breed") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setBreed: (breed: string) => void;
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dog: Dog) => void;
  fetchDogs: (page?: "next" | "prev") => void;
  findMatch: () => void;
  fetchBreeds: () => void;
}

const useStore = create<DogState>()((set, get) => ({
  dogs: [],
  next: undefined,
  prev: undefined,
  sortField: "breed",
  sortOrder: "asc",
  results: 0,
  favorites: [],
  match: null,
  breeds: [],
  breed: "",
  setDogs: (dogs: Dog[]) => set({ dogs }),
  setNext: (next: string) => set({ next }),
  setPrev: (prev: string) => set({ prev }),
  setSortField: (field: "name" | "age" | "breed") => set({ sortField: field }),
  setSortOrder: (order: "asc" | "desc") => set({ sortOrder: order }),
  setBreed: (breed: string) => set({ breed }),
  addFavorite: (dog: Dog) => {
    if (get().match) {
      // Clear the match if the user starts adding favorites again, letting them reset
      set({ match: null });
    }

    set((state) => ({ favorites: [...state.favorites, dog] }));
  },
  removeFavorite: (dog: Dog) =>
    set((state) => ({
      favorites: state.favorites.filter((d) => d.id !== dog.id),
    })),
  fetchDogs: async (page?: "next" | "prev") => {
    const { next, prev, sortField, sortOrder, breed } = get();
    const query = page
      ? page === "next"
        ? next
        : prev
      : `/dogs/search?sort=${sortField}:${sortOrder}&size=30${
          breed && `&breeds=${breed}`
        }`;

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

    if (response.status === 401) {
      redirect("/");
    }

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
    set({ dogs, next: data.next, prev: data.prev, results: data.total });
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

    if (response.status === 401) {
      redirect("/");
    }

    const data: { match: string } = await response.json();

    set({
      match: favorites.find((dog) => dog.id === data.match) ?? null,
      favorites: [],
    });
  },
  fetchBreeds: async () => {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (response.status === 401) {
      redirect("/");
    }

    const data: string[] = await response.json();

    set({ breeds: data });
  },
}));

export default useStore;

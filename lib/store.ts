import { create } from "zustand";
import { Dog } from "@/types";

interface DogState {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
}

const useStore = create<DogState>()((set) => ({
  dogs: [],
  setDogs: (dogs: Dog[]) => set({ dogs }),
}));

export default useStore;

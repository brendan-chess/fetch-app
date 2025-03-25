import useStore from "@/lib/store";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PawPrint } from "lucide-react";
export default function BreedFilter() {
  const breeds = useStore((state) => state.breeds);
  const fetchBreeds = useStore((state) => state.fetchBreeds);
  const setBreed = useStore((state) => state.setBreed);
  const fetchDogs = useStore((state) => state.fetchDogs);
  const breed = useStore((state) => state.breed);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  const handleChange = (value: string) => {
    setBreed(value);
    fetchDogs();
  };

  return (
    <div className="flex items-center space-x-2">
      <PawPrint className="w-5 h-5 stroke-muted-foreground" />
      <Select onValueChange={handleChange} value={breed}>
        <SelectTrigger className="w-60 cursor-pointer">
          <SelectValue placeholder="Filter breed" />
        </SelectTrigger>
        <SelectContent>
          {breeds.map((breed) => (
            <SelectItem key={breed} value={breed}>
              {breed}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

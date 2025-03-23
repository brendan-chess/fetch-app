import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/lib/store";
import { Button } from "../ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useEffect } from "react";
export default function Sort() {
  const sortField = useStore((state) => state.sortField);
  const sortOrder = useStore((state) => state.sortOrder);
  const setSortField = useStore((state) => state.setSortField);
  const setSortOrder = useStore((state) => state.setSortOrder);
  const fetchDogs = useStore((state) => state.fetchDogs);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs, sortField, sortOrder]);

  return (
    <div className="flex space-x-2">
      <Select value={sortField} onValueChange={setSortField}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="age">Age</SelectItem>
          <SelectItem value="breed">Breed</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant={"outline"}
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
    </div>
  );
}

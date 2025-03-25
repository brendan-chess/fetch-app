import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import useStore from "@/lib/store";

export default function PreviousPage() {
  const fetchDogs = useStore((state) => state.fetchDogs);
  const prev = useStore((state) => state.prev);

  if (!prev) return null;

  const handleClick = () => {
    fetchDogs("prev");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleClick}
      className="cursor-pointer p-3"
      variant={"outline"}
      asChild
    >
      <ChevronLeft className="w-12 h-12" />
    </Button>
  );
}

import { Button } from "../ui/button";
import useStore from "@/lib/store";
import { ChevronRight } from "lucide-react";

export default function NextPage() {
  const fetchDogs = useStore((state) => state.fetchDogs);
  const next = useStore((state) => state.next);

  if (!next) return null;

  return (
    <Button
      onClick={() => fetchDogs("next")}
      className="cursor-pointer p-3"
      variant={"outline"}
      asChild
    >
      <ChevronRight className="w-12 h-12" />
    </Button>
  );
}

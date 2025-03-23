import { Button } from "../ui/button";
import useStore from "@/lib/store";

export default function PreviousPage() {
  const fetchDogs = useStore((state) => state.fetchDogs);
  const prev = useStore((state) => state.prev);

  if (!prev) return null;

  return <Button onClick={() => fetchDogs("prev")}>Previous</Button>;
}

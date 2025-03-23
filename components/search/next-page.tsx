import { Button } from "../ui/button";
import useStore from "@/lib/store";

export default function NextPage() {
  const fetchDogs = useStore((state) => state.fetchDogs);
  const next = useStore((state) => state.next);

  if (!next) return null;

  return <Button onClick={() => fetchDogs("next")}>Next</Button>;
}

import { Button } from "../ui/button";
import useStore from "@/lib/store";

export default function FindMatch() {
  const findMatch = useStore((state) => state.findMatch);

  return (
    <Button variant={"default"} className="cursor-pointer" onClick={findMatch}>
      Find my match
    </Button>
  );
}

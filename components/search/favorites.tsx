import { Dog, Heart } from "lucide-react";
import { Button } from "../ui/button";
import useStore from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import DogCard from "./dog-card";
import { Card, CardContent } from "../ui/card";

export default function Favorites() {
  const favorites = useStore((state) => state.favorites);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <Heart className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Favorite Dogs</SheetTitle>
          <SheetDescription>Find your next best friend.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4 overflow-y-scroll ">
          {favorites.length < 1 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <Dog size={32} className="stroke-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  No dogs favorited yet.
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                {favorites.length} dog{favorites.length !== 1 && "s"}
              </div>
              {favorites.map((favorite) => (
                <DogCard key={favorite.id} dog={favorite} />
              ))}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

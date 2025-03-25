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
import FindMatch from "./find-match";

export default function Favorites() {
  const favorites = useStore((state) => state.favorites);
  const match = useStore((state) => state.match);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center cursor-pointer">
          <Heart className="w-6 h-6" />
          <span>Favorites</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Favorite Dogs</SheetTitle>
          <SheetDescription>Find your next best friend.</SheetDescription>
        </SheetHeader>
        <div className="px-4 overflow-y-scroll">
          {match ? (
            <DogCard dog={match} />
          ) : (
            <>
              {favorites.length > 0 && (
                <div className="flex justify-between items-center px-4 pb-4 sticky top-0 bg-background">
                  <div className="text-sm text-muted-foreground">
                    {favorites.length} dog{favorites.length !== 1 && "s"}
                  </div>
                  <FindMatch />
                </div>
              )}
              <div className="space-y-4 overflow-y-scroll">
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
                    {favorites.map((favorite) => (
                      <DogCard key={favorite.id} dog={favorite} />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

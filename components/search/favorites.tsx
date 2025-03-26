import { Dog } from "lucide-react";
import useStore from "@/lib/store";
import DogCard from "./dog-card";
import FindMatch from "./find-match";

export default function Favorites() {
  const favorites = useStore((state) => state.favorites);
  const match = useStore((state) => state.match);

  return (
    <div className="px-4 pb-12">
      {match ? (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-xl font-bold">Your Match</div>
          <DogCard dog={match} />
        </div>
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
              <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                <Dog size={32} className="stroke-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  No dogs favorited yet.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                {favorites.map((favorite) => (
                  <DogCard key={favorite.id} dog={favorite} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

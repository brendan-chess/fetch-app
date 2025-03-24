import { Dog } from "@/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import useStore from "@/lib/store";
import { Heart, MapPin, PawPrint } from "lucide-react";

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <Card className="px-6">
      <CardHeader className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">{dog.name}</CardTitle>
          <CardDescription>
            {dog.age} year{dog.age !== 1 && "s"} old
          </CardDescription>
        </div>
        <FavoriteButton dog={dog} />
      </CardHeader>
      <CardContent className="relative w-72 h-72">
        <Image
          src={dog.img}
          alt={dog.name}
          fill={true}
          className="rounded-md object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-between px-2">
        <div className="flex items-center space-x-2">
          <PawPrint className="w-5 h-5 stroke-muted-foreground" />
          <span className="font-semibold max-w-40 truncate">{dog.breed}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-5 h-5 stroke-muted-foreground" />
          <span className="font-semibold">{dog.zip_code}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function FavoriteButton({ dog }: { dog: Dog }) {
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const favorites = useStore((state) => state.favorites);

  const isFavorite = favorites.some((favorite) => favorite.id === dog.id);

  const handleClick = () =>
    isFavorite ? removeFavorite(dog) : addFavorite(dog);

  return (
    <Button
      onClick={handleClick}
      variant={"ghost"}
      className="cursor-pointer"
      asChild
    >
      <Heart
        className={`${isFavorite && "fill-red-600 stroke-red-600"} w-14 h-14`}
      />
    </Button>
  );
}

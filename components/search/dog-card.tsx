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
import { Heart } from "lucide-react";

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="space-y-2">
          <CardTitle>{dog.name}</CardTitle>
          <CardDescription>{dog.breed}</CardDescription>
        </div>
        <FavoriteButton dog={dog} />
      </CardHeader>
      <CardContent>
        <Image src={dog.img} alt={dog.name} width={200} height={200} />
      </CardContent>
      <CardFooter>
        <p>
          {dog.age} year{dog.age !== 1 && "s"} old
        </p>
        <p>{dog.zip_code}</p>
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
    <Button onClick={handleClick} variant={"ghost"}>
      <Heart className={`${isFavorite && "fill-red-500 stroke-red-500"}`} />
    </Button>
  );
}

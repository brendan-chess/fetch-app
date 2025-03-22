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

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dog.name}</CardTitle>
        <CardDescription>{dog.breed}</CardDescription>
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

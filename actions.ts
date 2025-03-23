import { SearchResponse, Dog } from "@/types";

export const fetchDogs = async (setDogs: (dogs: Dog[]) => void) => {
  // Fetch dogs from the search route
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs/search",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const data: SearchResponse = await response.json();
  console.log(data);

  // Get full dog data from the dogs route
  const dogData = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data.resultIds),
    },
  );

  const dogs: Dog[] = await dogData.json();

  // Set the dogs being displayed
  setDogs(dogs);
};

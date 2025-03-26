"use client";

import { LogOut } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/");
  };

  return (
    <Button onClick={handleClick} variant="outline" className="cursor-pointer">
      <LogOut />
      <div className="hidden md:block">Log Out</div>
    </Button>
  );
}

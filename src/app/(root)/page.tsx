'use client'
import { Button } from "@/components/ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default function Home() {
  const { userId, isSignedIn } = useAuth();

  return (
    <>
      <div className="m-4">
        <UserButton />
      </div>
    </>

  );
}

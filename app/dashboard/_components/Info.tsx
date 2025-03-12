"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const Info = () => {
  const {user} = useUser();
  return (
    <div className="flex justify-between items-center gap-5 font-bold text-3xl text-primary">
        Hello, {user?.fullName}
        <Link href={"/create"}><Button className="p-6 text-base">+ Create New Logo</Button></Link>
    </div>
    
  )
}

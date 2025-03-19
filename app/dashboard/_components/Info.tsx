"use client";
import {useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserDetailContext, UserDetailContextType } from "@/app/_context/userDetailContext";


export const Info = () => {
  const { userDetail } : UserDetailContextType = useContext(UserDetailContext);
  const { user } = useUser();
  
  return (
    <div className="flex justify-between items-center gap-5 font-bold text-3xl text-primary">
        <div className="flex flex-col gap-4">
            Hello, {user?.fullName}
            <p className="text-xl">{userDetail?.credits} credits left</p>
        </div> 
        <Link href={"/create"}><Button className="p-6 text-base">+ Create New Logo</Button></Link>
    </div>
    
  )
}

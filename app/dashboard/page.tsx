"use client";

import React, { useEffect } from 'react';
import { Info } from "./_components/Info";
import { LogoList } from './_components/LogoList';
import { useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';



const Dashboard = () => {
  //If user is not Signed In redirect to Home Page
  const {user} = useUser();
  useEffect(()=>{
    if(!user){
      redirect("/");
    }
  },[]);

  return (
    <div className="mt-20 px-16">
        <Info/>
        <LogoList/>
    </div>
  )
}
export default Dashboard;

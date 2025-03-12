"use client";

import React from 'react';
import { Info } from "./_components/Info";
import { LogoList } from './_components/LogoList';



const Dashboard = () => {
  return (
    <div className="mt-20 px-16">
        <Info/>
        <LogoList/>
    </div>
  )
}
export default Dashboard;

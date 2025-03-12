"use client";
import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs';


 const Provider = ({children}: {children: ReactNode}) => {
  const {user} = useUser();

  const CheckUserAuth = async () => {
    const response = await axios.post("/api/users",{
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userName : user?.fullName,
    })
    console.log(response.data);
  }

  useEffect(()=> {
    user && CheckUserAuth();
  },[user])
  
  
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}
export default Provider;

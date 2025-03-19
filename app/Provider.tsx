"use client";
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from './_context/userDetailContext';
import { UserDetailContextType } from './_context/userDetailContext';

 const Provider = ({children}: {children: ReactNode}) => {
  const [userDetail,setUserDetail] = useState();
  const {user} = useUser();

  const CheckUserAuth = async () => {
    const response = await axios.post("/api/users",{
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userName : user?.fullName,
    })
    console.log(response.data);
    setUserDetail(response.data);
  }

  useEffect(()=> {
    user && CheckUserAuth();
  },[user])
  
  
  return (
    <div>
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
          <Header/>
          {children}
        </UserDetailContext.Provider>
    </div>
  )
}
export default Provider;

"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton,useUser } from '@clerk/nextjs';
import LogOutButton from './LogOutButton';

const Header = () => {
  const [open,setOpen] = useState(false);
  const {user} = useUser();
  return (
    <div className='w-full flex justify-between items-center shadow-md md:px-8 md:py-3 px-4 py-3'>
       
        <Link href={"/"}>
          <Image className='font-bold' 
            src={'/logo.svg'} 
            alt='Logo'
            width={100} 
            height={30}
            />
        </Link>
        
        {user ?
          <div className='relative flex gap-3 justify-center items-center'>
              <Link href={"/dashboard"}><Button> DashBoard </Button></Link> 
              <img
                src={user.imageUrl}
                width="45px"
                height="45px"
                alt={user.fullName || ""}
                className="rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className='absolute top-16 right-0'>
                      <LogOutButton />
                </div>
              )}
          </div>
         : 
         <SignInButton mode={"modal"} forceRedirectUrl={"/create"}> 
            <Button> 
              Sign In
            </Button>
         </SignInButton>
      
        }
        
    </div>
  )
}

export default Header;

"use client";
import { Button } from "@/components/ui/button";
import { HeadingDesc } from "./HeadingDesc";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

interface PricingModelProps {
    formData: {
        title: string;
        desc: string;
        pallete: string;
        design: any;
        idea: string;
      }
}
const PricingModel = ({formData } : PricingModelProps) => {
    const {user} = useUser();
    useEffect(() => {
        
        if(formData?.title && typeof window !== "undefined"){
            localStorage.setItem("formData",JSON.stringify(formData));
        }

    },[formData])
    return (
        <div>
            <HeadingDesc
                title={"Logo Title"}
                description={"Add your Business, App or Website Name for a custom Logo"}
            />
            <div className=" mt-5  mx-auto rounded-2xl shadow-lg p-3 bg-primary text-gray-600  max-w-[32rem]">
                <div className="relative flex flex-col items-center p-14 pt-10 bg-purple-50 rounded-xl">
                <span className="mt-[-12px] absolute top-0 right-0 flex items-center bg-primary rounded-l-full py-2 px-3 text-xl font-semibold text-amber-100">
                    $0 <small className="text-xs ml-1 text-white">/ month</small>
                </span>
                 <Image className='font-bold' src={'./free.svg'} alt='Logo' width={80} height={10}/>
                
                <p className="text-xl mt-5  font-semibold text-blue-800 bg-indigo-200 px-2 py-1 rounded-lg">
                    Free Today, Free Always!
                </p>
                <p className="text-center font-semibold  mt-5">
                   AI-powered logo creation, 100% free. Start designing now!
                </p>
                <ul className="flex flex-col font-semibold space-y-4 mt-4">
                    <li className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="md:whitespace-nowrap">
                        Generate unlimited logos for free
                    </span>
                    </li>
                    <li className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor" />
                        </svg>
                    </span>
                    <span>
                        Experience slight wait times for processing.
                    </span>
                    </li>
                    <li className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="md:whitespace-nowrap">Estimated wait time: 30 seconds to 3 minutes.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="md:whitespace-nowrap">High-quality AI-generated logos, made just for you!</span>
                    </li>
                    
                </ul>
                {user ? 
                    <Link href={"/generate-logo"}>
                    <Button  className="w-full p-6 flex justify-center items-center text-lg font-medium mt-6 bg-primary  hover:bg-purple-900 focus:outline-none">
                        Generate Free
                    </Button>
                    </Link> 
                    
                    : 
                
                    <SignInButton mode={"modal"} forceRedirectUrl={"/generate-logo"}>
                        <Button className="w-full p-6 flex justify-center items-center text-lg font-medium mt-6 bg-primary  hover:bg-purple-900 focus:outline-none">
                                Generate Free
                        </Button>
                    </SignInButton>
                }
                </div>
            </div>
      </div>
    );
  }
  
  export default PricingModel;
  
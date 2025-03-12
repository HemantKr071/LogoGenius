"use client";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";



export const LogoList = () => {
  const [logoList, setLogoList] = useState<any>([]);
  const {user} = useUser();

  useEffect(()=>{
    const GetLogos = async () => {
        console.log("Getting Logos");
        setLogoList([]);
        if (user?.primaryEmailAddress?.emailAddress) {
          const logos = await getDocs(collection(db, "users", user.primaryEmailAddress.emailAddress, "logos"));
          logos.forEach((doc)=>{
            console.log(doc.data());
            setLogoList([...logoList,doc.data()])

          })
        }
        else{
            console.log("User is not defined");
        }

    }
    user && GetLogos();
  },[user]);

  const ViewLogo = (image:any) =>{
    const imageWindow = window.open();
    imageWindow?.document.write(`<img src="${image}" alt="logo"`)

  }
  return (
    <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-10">
            {logoList.length > 0 ? logoList.map((logo: any, index: number) => (
                <div key={index} className="hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => ViewLogo(logo?.image)}>
                    <Image src={logo?.image} alt="Logo"
                    width={400}
                    height={200}
                    className="w-full rounded-xl"
                    />
                    <h2 className="text-center text-lg font-medium mt-2">{logo?.title}</h2>
                    <p className="text-sm text-gray-500 text-center">{logo?.desc}</p>

                </div>

            )):
            [1,2,3,4,5,6].map(( index: number) => (
                <div key={index} className="w-full bg-slate-200 animate-pulse rounded-xl h-[250px]">

                </div>

            ))
        }
        </div>
    </div>
  )
}

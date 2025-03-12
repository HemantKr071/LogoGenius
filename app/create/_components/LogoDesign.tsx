import React, { useEffect, useState } from 'react'
import { HeadingDesc } from './HeadingDesc'
import Logos from '@/app/_data/Logos'
import { HandleChangeProps } from './LogoTitle';

export const LogoDesign = ({handleChange,formData} : HandleChangeProps) => {
  const [logoDesign,setLogoDesign] = useState(formData?.design?.title?.trim() || "Wordmark Logo");
  
  return (
    <div>
         <HeadingDesc
          title={"Choose your Logo Style"}
          description={"Select the type of Logo Design that best represents your Brand's unique identity"}
          />

        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
          {Logos.map((logo,index) => (
            <div className={`flex flex-col gap-5 items-center justify-end cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-primary hover:shadow-xl ${logoDesign === logo.title && "border-2 border-primary rounded-lg"} `} 
            
            onClick={() => {
              setLogoDesign(logo.title);
              handleChange("design",logo);
            }}
            key={index}>
                
                <img src={logo.image} alt={logo.title} width={300} height={250} 
                className='h-[250px w-[300px] object-cover' />
                
                <p className='text-sm font-semibold'>{logo.title}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

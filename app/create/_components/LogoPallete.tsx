"use client";
import React, { useState } from 'react'
import { HeadingDesc } from './HeadingDesc'
import { HandleChangeProps } from './LogoTitle';

const Colors = [
    {
      name: "Reds",
      colors: ["#FF0000", "#FF6347", "#FF4500", "#DC143C"]
    },
    {
      name: "Oranges & Yellows",
      colors: ["#FFA500", "#FFD700", "#FFEC8B", "#F0E68C"]
    },
    {
      name: "Greens",
      colors: ["#008000", "#32CD32", "#00FF7F", "#7CFC00"]
    },
    {
      name: "Blues",
      colors: ["#0000FF", "#1E90FF", "#87CEFA", "#4682B4"]
    },
    {
      name: "Purples",
      colors: ["#800080", "#8A2BE2", "#9370DB", "#DDA0DD"]
    },
    {
      name: "Pinks",
      colors: ["#FFC0CB", "#FF69B4", "#DB7093", "#C71585"]
    },
    {
      name: "Browns",
      colors: ["#A52A2A", "#8B4513", "#D2691E", "#CD853F"]
    },
    {
      name: "Grays & Blacks",
      colors: ["#000000", "#696969", "#808080", "#C0C0C0"]
    },
    {
      name: "Teals",
      colors: ["#00FFFF", "#40E0D0", "#48D1CC", "#5F9EA0"]
    }
  ];
  

export const LogoPallete = ({handleChange,formData} : HandleChangeProps) => {
  const [pickColor,setPickColor] = useState(formData.pallete?.trim() || 'Blues')

  return (
    <div>
           <HeadingDesc
           title={"Choose Your Color Pallete"}
           description={"Pick the colors that reflect your brands personality and create a lasting impression"}
           />

           <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-12'>
            {Colors.map((pallete,index) => (
                <div className={`flex cursor-pointer p-1 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-primary hover:shadow-xl ${pickColor === pallete.name && "border-2 border-primary rounded-lg"}`}
                key={index}>

                    {pallete.colors.map((color,index) => (
                       
                       <div onClick={() => {
                            
                            setPickColor(pallete.name);
                             handleChange("pallete",pallete.name)
                        }} 
                        
                        className='h-24 w-full' key={index}
                        style={{background:color}}>
                        </div>
                    ))}

                </div>
            ))}
           </div>

    </div>
  )
}

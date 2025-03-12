"use client";
import { useState,useEffect } from 'react';
import { HeadingDesc } from './HeadingDesc'
import { HandleChangeProps } from './LogoTitle';
import useDebounce from '@/app/_hooks/useDebounce';

export const LogoDesc = ({ handleChange,formData }:HandleChangeProps) => {
  const [desc, setDesc] = useState(formData.desc);
  const debouncedValue = useDebounce({ delay: 500, value: desc });
  
  useEffect(() => {
    handleChange("desc", debouncedValue);
  }, [debouncedValue]);
 
  return (
    <div>
        <HeadingDesc
        title={"Describe your Logo Vision"}
        description={"Express your ideas, themes, or inspirations to craft a logo that truly reflects your brand’s essence"}
        />

        <input className="mx-auto mt-5 rounded-lg h-14 w-full bg-violet-100  border-2 border-purple-300 p-4 placeholder-purple-400 focus:text-violet-950 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100" 
        placeholder="Enter your Logo Name..."
        defaultValue={formData.desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        />
    </div>
  )
}

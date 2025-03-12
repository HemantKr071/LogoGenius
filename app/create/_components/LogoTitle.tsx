"use client";
import {useState,useEffect} from 'react'
import { HeadingDesc } from './HeadingDesc'
import { useSearchParams } from 'next/navigation';
import useDebounce from '@/app/_hooks/useDebounce';

export interface HandleChangeProps{

  handleChange: (field: string, value: any) => void;

  formData: {
    title: string;
    desc: string;
    pallete: string;
    design: any;
    idea: any;
  };
      
}
export const LogoTitle = ({ handleChange,formData }: HandleChangeProps) => {
  
  const searchParams = useSearchParams();
  const [title,setTitle] = useState(searchParams?.get('title') ?? '');
  
  const debouncedTitle = useDebounce({ delay: 500, value: title });
  

  useEffect(() => {
    handleChange("title", debouncedTitle);
  }, [debouncedTitle]);
  
  return (
    <div>
       <HeadingDesc
       title={"Logo Title"}
       description={"Add your Business, App or Website Name for a custom Logo"}
       />
      
      <input className=" mx-auto mt-5 rounded-lg h-14 w-full bg-violet-100  border-2 border-purple-300 p-4 placeholder-purple-400 focus:text-violet-950 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100" 
      placeholder="Enter your Logo Name..."
      defaultValue={formData.title.trim() || title}
      onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value); 
      }}
       />
    </div>
  )
}

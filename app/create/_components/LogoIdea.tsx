"use client";
import React, { useEffect, useState } from 'react'
import { HandleChangeProps } from './LogoTitle'
import { HeadingDesc } from './HeadingDesc'
import PROMPT from '@/app/_data/Prompt';
import axios from 'axios';
import IdeaGenerateLoader from './IdeaGenerateLoader';

interface Idea {
  title:string,
  description: string;
  
}

export const LogoIdea = ({ handleChange,formData }: HandleChangeProps) => {
  

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [loading,setLoading] = useState(true);


  useEffect(() => {
    const GenerateIdea = async () => {
      const prompt = PROMPT.DESIGN_IDEA_PROMPT
      .replace('{logoType}',formData?.design?.title)
      .replace('{logoTitle}',formData?.title)
      .replace('{logoDesc}',formData?.desc)
      .replace('{logoPrompt}',formData?.design?.prompt);
      console.log(prompt);

      const response = await axios.post("/api/ai-design-ideas",{
        prompt
      })
      setIdeas(response.data);
      setLoading(false);
      console.log(response.data);
    }
   
    GenerateIdea();

  },[])
  
  return (
    <div>
       <HeadingDesc
        title={"Choose Your Logo Idea"}
        description={"There are some ideas Pick the idea that reflect your brands personality and create a lasting impression"}
        />
        {loading ? 
        <div className='py-16 gap-10 flex flex-col justify-end items-center'>
             <IdeaGenerateLoader/>
             <h1 className='font-semibold text-xl text-slate-700'>Generating Ideas, Please Wait...</h1>
        </div>  :
         
         <div className='grid grid-cols-2 md:grid-cols-3 p-4 gap-5 mt-5 border border-slate-300 '>
          {ideas.map((idea,index)=>(

              <div className={`flex flex-col p-2 gap-5 items-center justify-end cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-primary hover:shadow-xl ${selectedIdea === idea && "border-2 border-primary rounded-lg"} `} 
                          
              onClick={() => {
                setSelectedIdea(idea);
                handleChange("idea",idea);
              }}
              key={index}>
                  <div className='w-full h-full flex items-center justify-center'>
                    <div className='text-lg font-semibold text-center'>{idea.title}</div>
                  </div>
              </div>

          ))}
        </div>
        }
        
    </div>
  )
}

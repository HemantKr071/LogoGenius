"use client";
import React from 'react'
interface HeadingDescProps{
    title:string,
    description:string
}
export const HeadingDesc = ({title,description} : HeadingDescProps) => {
  return (
    <div className='mx-auto'>
        <h2 className='text-primary font-bold text-3xl'>{title}</h2>
        <p className='text-lg  text-gray-600 mt-2'>{description}</p>
    </div>
  )
}

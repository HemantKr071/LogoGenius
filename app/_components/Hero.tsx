"use client";
import {useEffect} from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
const SearchBar = dynamic(() => import('./SearchBar'), { ssr: false });
const Logos = [
  { src: "/FindMyJob.webp", alt: "Find Your Job" },
  { src: "/Coffee.webp", alt: "Coffee Shop" },
  { src: "/Youtube.webp", alt: "Youtube" },
  { src: "/LogoGenius.webp", alt: "Logo Genius" },
  { src: "/Mobile.webp", alt: "Mobile" },
  { src: "/Chicken.webp", alt: "Chicken Restaurant" },
  { src: "/AiCoding.webp", alt: "AI Coding" },
  { src: "/Pizza.webp", alt: "Pizza Shop" },
  { src: "/Gym.webp", alt: "Gym" },
  { src: "/Delivery.webp", alt: "Delivery" },
  { src: "/AiSaas.webp", alt: "AI Saas" },
  { src: "/RedBull.webp", alt: "Red Bull Drink" },
];

export const Hero = () => {
const [inputValue, setInputValue] = useState("");

useEffect(() => {
  setInputValue(inputValue);
}, [inputValue]);
  
return (
    <div className='flex flex-col justify-center items-center'>
        <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8 animate-fade-up">
            <div className="space-y-4">
              <h2 className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full text-sm font-medium  text-gray-800">
                AI-Powered Logo Generation
              </h2>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 bg-clip-text text-transparent">
                Create the perfect logo
                <br /> in seconds
              </h1>
              
              <p className="max-w-2xl font-display font-light mx-auto text-lg sm:text-xl text-gray-600 ">
                "Design is intelligence made visible. Let AI craft your brand's visual story."
              </p>
            </div>
            {/* Search Section */}
            <div className="flex md:flex-row flex-col w-full items-center justify-center gap-7 md:gap-1 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex-grow w-full md:mr-4 animate-fade-up">
                <SearchBar  value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    
              </div>
             
              {/* Button to generate logos */}
              <Link href={`/create?title=${inputValue}`}>
                <Button className='animate-fade-up w-40 md:w-auto h-12 rounded-full'>Get Started</Button>
              </Link>
            </div>
            
          </div>
        </div>
      </main>
        <div className='font-bold font-display text-3xl text-primary text-center py-5'>Generated Logos</div>
        <div className='grid grid-cols-2 md:grid-cols-4 rounded-xl px-4 gap-8 py-9'>
          {Logos.map((logo, index) => (
            <Image 
              key={index} 
              className="rounded-xl hover:scale-105 transition-all duration-300" 
              src={logo.src} 
              alt={logo.alt} 
              height={200} 
              width={250} 
            />
          ))}
        </div>
        <footer className="relative w-full mt-10 bg-gradient-to-b from-white to-purple-50 border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-xl text-gray-900">Logo Genius</h4>
                <p className="text-gray-600">
                  Creating perfect logos with the power of AI technology.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="mt-12 pt-8 border-t border-purple-100 text-center py-10 text-gray-600">
            <p>© 2025 LogoGenius. All rights reserved.</p>
        </div>
    </div>
  )
}

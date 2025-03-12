"use client";
import { useEffect, useState } from "react";
import PROMPT from "../_data/Prompt";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { Generating, Loader } from "./_components/LogoLoader";

interface FormData {
  title: string;
  desc: string;
  pallete: string;
  design: { title: string; prompt: string };
  idea: { title: string; description: string };
}

const GenerateLogo = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [logoImage,setLogoImage] = useState("");
  const [loading,setLoading] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
        console.log(formData);
      }
    }
  }, []);

  useEffect(() => {
   
    const GenerateLogoImage = async () => {
      setLoading(true);
      const prompt = PROMPT.GENERATE_LOGO_PROMPT
      .replace("{logoType}", formData?.design?.title ?? "")
      .replace("{logoTitle}", formData?.title ?? "")
      .replace("{logoDesc}", formData?.desc ?? "")
      .replace("{logoColor}", formData?.pallete ?? "")
      .replace("{logoPrompt}", formData?.design?.prompt ?? "")
      .replace("{logoIdea}", formData?.idea?.title ?? "")
      .replace("{logoIdeaDescription}", formData?.idea?.description ?? "");

      //console.log(prompt);

      const response = await axios.post("/api/ai-generate-logo",{
        prompt:prompt,
        email:user?.primaryEmailAddress?.emailAddress,
        title:formData?.title,
        desc:formData?.desc
      })
      
      console.log(response.data);
      setLogoImage(response.data?.image);
      setLoading(false);

    }
    GenerateLogoImage();

    
  }, [formData]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = logoImage;
    link.download = formData?.title || "logo"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return(
    <div>
      <div className="flex justify-center">
        {loading ? (
          <div className="mt-20 flex flex-col gap-6 justify-center items-center">
            <Loader/>
            <Generating/>
          </div>
        ) : (
          <div className="mt-20">
            {logoImage ? (
              <Image src={logoImage} alt="Generated Logo" width={300} height={250} />
            ) : null}
          </div>
        )}
    </div>
    
    <div className="flex justify-center mt-10">
        <Button onClick={handleDownload} className="mx-auto w-40 p-6 text-lg">Download <FaDownload /></Button>
    </div>
    
  </div>
  ) 
  
};

export default GenerateLogo;

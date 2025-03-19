"use client";
import { useEffect, useState, useCallback, useContext } from "react";
import PROMPT from "../_data/Prompt";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { Generating, Loader } from "./_components/LogoLoader";
import { redirect } from "next/navigation";
import { UserDetailContext, UserDetailContextType } from "../_context/userDetailContext";
import CreditExhaustedCard from "./_components/CreditsExhaustedCard";

interface FormData {
  title: string;
  desc: string;
  pallete: string;
  design: { title: string; prompt: string };
  idea: { title: string; description: string };
}

const GenerateLogo = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [logoImage, setLogoImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [creditsExhausted, setCreditsExhausted] = useState(false);
  const { user } = useUser();
  const { userDetail }: UserDetailContextType = useContext(UserDetailContext);

  useEffect(() => {
    // Redirect to home if user is not signed in
    if (!user) {
      redirect("/");
    }
    
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, []);

  useEffect(() => {
    if (!formData || !userDetail) return; // Prevent unnecessary API calls

    if (userDetail.credits === 0) {
      setCreditsExhausted(true);
      return;
    }

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

      try {
        const response = await axios.post("/api/ai-generate-logo", {
          prompt: prompt,
          email: user?.primaryEmailAddress?.emailAddress,
          title: formData?.title,
          desc: formData?.desc,
          userCredits: userDetail?.credits,
        });

        setLogoImage(response.data?.image);
      } catch (error) {
        console.error("Failed to generate the logo:", error);
      } finally {
        setLoading(false);
      }
    };

    GenerateLogoImage();
  }, [formData, userDetail]);

  const handleDownload = useCallback(() => {
    if (!logoImage) return;
    const link = document.createElement("a");
    link.href = logoImage;
    link.download = formData?.title || "logo";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    localStorage.removeItem("formData");
    localStorage.removeItem("currentStep");
  }, [logoImage, formData]);

  return (
    <div>
      <div className="flex justify-center">
        {creditsExhausted ? (
          <div className="mt-40 flex justify-center items-center">
            <CreditExhaustedCard/>
          </div>
        ) : loading ? (
          <div className="mt-20 flex flex-col gap-6 justify-center items-center">
            <Loader />
            <Generating />
          </div>
        ) : (
          <div className="mt-20">
            {logoImage && <Image src={logoImage} alt="Generated Logo" width={300} height={250} />}
          </div>
        )}
      </div>

      {!creditsExhausted && logoImage && (
        <div className="flex justify-center mt-10">
          <Button onClick={handleDownload} className="mx-auto w-40 p-6 text-lg">
            Download <FaDownload />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;

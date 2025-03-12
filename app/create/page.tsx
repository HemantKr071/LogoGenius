"use client";
import { useState, useEffect } from "react";
import { LogoTitle } from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LogoDesc } from "./_components/LogoDesc";
import { LogoPallete } from "./_components/LogoPallete";
import { LogoDesign } from "./_components/LogoDesign";
import { LogoIdea } from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

const CreateLogo = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    pallete: "",
    design: "",
    idea: "",
  });

  // Load data from localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("currentStep");
      const savedFormData = localStorage.getItem("formData");

      if (savedStep) setStep(parseInt(savedStep, 10));
      if (savedFormData) setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentStep", step.toString());
    }
  }, [step]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem("formData", JSON.stringify(updatedFormData));
      }
      return updatedFormData;
    });
  };

  const nextStep = () => setStep((step) => step + 1);
  const prevStep = () => setStep((step) => (step > 1 ? step - 1 : step));

  return (
    <div className="mt-28 md:p-10 p-5 border rounded-xl md:mx-72 mx-5 shadow-sm">
      {step === 1 && <LogoTitle handleChange={handleChange} formData={formData} />}
      {step === 2 && <LogoDesc handleChange={handleChange} formData={formData} />}
      {step === 3 && <LogoPallete handleChange={handleChange} formData={formData} />}
      {step === 4 && <LogoDesign handleChange={handleChange} formData={formData} />}
      {step === 5 && <LogoIdea handleChange={handleChange} formData={formData} />}
      {step === 6 && <PricingModel formData={formData} />}

      <div className="flex items-center justify-between mt-10 mx-auto">
        {step !== 1 && (
          <Button onClick={prevStep} disabled={step === 1} variant={"outline"}>
            <ArrowLeft /> Previous
          </Button>
        )}
        <Button onClick={nextStep}>
          <ArrowRight /> Continue
        </Button>
      </div>
    </div>
  );
};

export default CreateLogo;

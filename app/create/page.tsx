"use client";
import { useState, useEffect } from 'react';
import { LogoTitle } from './_components/LogoTitle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LogoDesc } from './_components/LogoDesc';
import { LogoPallete } from './_components/LogoPallete';
import { LogoDesign } from './_components/LogoDesign';
import { LogoIdea } from './_components/LogoIdea';
import PricingModel from './_components/PricingModel';

const CreateLogo = () => {
  const [step, setSteps] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [formData, setFormData] = useState(() => {
    // Retrieve the form data from localStorage or default to empty values
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : {
      title: "",
      desc: "",
      pallete: "",
      design: "",
      idea: "",
    };
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev: FormData) => {
      const updatedFormData: FormData = {
      ...prev,
      [field]: value
      };
      // Save the updated form data to localStorage
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    // Save the current step to localStorage whenever it changes
    localStorage.setItem('currentStep', step.toString());
  }, [step]);

  const nextStep = () => {
    setSteps(step => step + 1);
  };

  const prevStep = () => {
    if (step > 1) setSteps(step => step - 1);
  };

  return (
    <div className='mt-28 md:p-10 p-5 border rounded-xl md:mx-72 mx-5 shadow-sm'>
      {step === 1 && <LogoTitle handleChange={handleChange} formData={formData} />}
      {step === 2 && <LogoDesc handleChange={handleChange} formData={formData} />}
      {step === 3 && <LogoPallete handleChange={handleChange} formData={formData} />}
      {step === 4 && <LogoDesign handleChange={handleChange} formData={formData} />}
      {step === 5 && <LogoIdea handleChange={handleChange} formData={formData} />}
      {step === 6 && <PricingModel formData={formData} />}

      <div className='flex items-center justify-between mt-10 mx-auto'>
        {step !== 1 && (
          <Button onClick={prevStep} disabled={step === 1} variant={'outline'}>
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
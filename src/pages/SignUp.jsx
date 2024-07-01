import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import BasicInfoSettings from "../components/BasicInfoSettings";
import CategorySettings from "../components/CategorySettings";
import UserDetailsSettings from "../components/UserDetailsSettings";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    BasicInfoData: {},
    UserDetailsData: {},
    CategoryData: {},
  });

  const handleNext = (data) => {
    setFormData((prevFormData) => {
      switch (step) {
        case 1:
          return {
            ...prevFormData,
            BasicInfoData: data,
          };
        case 2:
          return {
            ...prevFormData,
            UserDetailsData: data,
          };
        case 3:
          return {
            ...prevFormData,
            CategoryData: data,
          };
        default:
          console.warn(`Unhandled step: ${stepRef.current}`);
          return prevFormData;
      }
    });
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoSettings onNext={handleNext} />;
      case 2:
        return <UserDetailsSettings onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <CategorySettings onNext={handleNext} onBack={handleBack} />;
      default:
        return <BasicInfoSettings onNext={handleNext} />;
    }
  };

  return (
    <div>
      <div className="flex justify-between p-10">
        <button onClick={handleBack}>back</button>
        <Progress value={step * 20} />
        <div>none</div>
      </div>
      <div className="flex-center pt-8">{renderStep()}</div>
    </div>
  );
};

export default SignUp;

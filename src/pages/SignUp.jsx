import React, { useRef, useState } from "react";
import Header from "../components/Header";
import BasicInfoSettings from "../components/BasicInfoSettings";
import CategorySettings from "../components/CategorySettings";
import UserDetailsSettings from "../components/UserDetailsSettings";

const SignUp = () => {
  const stepRef = useRef(1);
  const [formData, setFormData] = useState({
    BasicInfoData: {},
    UserDetailsData: {},
    CategoryData: {},
  });

  const handleNext = (data) => {
    setFormData((prevFormData) => {
      switch (stepRef.current) {
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
    stepRef.current += 1;
  };

  const handleBack = () => {
    if (stepRef.current > 1) {
      stepRef.current -= 1;
    }
  };

  const renderStep = () => {
    switch (stepRef.current) {
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
      <Header leftChild={"<"} title={"SignUp Page"} />
      <div className="flex-center">{renderStep()}</div>
    </div>
  );
};

export default SignUp;

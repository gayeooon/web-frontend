import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import BasicInfoSettings from "../components/BasicInfoSettings";
import CategorySettings from "../components/CategorySettings";
import UserDetailsSettings from "../components/UserDetailsSettings";
import PublisherSettings from "../components/PublisherSettings";
import SettingComplete from "@/components/SettingComplete";
import backIcon from "../assets/back.svg";

/**
 * 회원가입 프로세스를 관리하는 컴포넌트
 * @returns {JSX.Element}
 */
const SignUp = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    BasicInfoData: {
      username: "",
      email: "",
      tel: "",
    },
    UserDetailsData: {
      gender: "",
      birthdate: "",
    },
    CategoryData: [],
    PublisherData: [],
  });

  /**
   * 다음 단계로 넘어가는 함수
   * @param {Object} data - 현재 단계에서 입력된 데이터
   */
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
        case 4:
          return {
            ...prevFormData,
            PublisherData: data,
          };
        case 5:
          retrun;
        default:
          console.warn(`Unhandled step: ${stepRef.current}`);
          return prevFormData;
      }
    });
    setStep((prevStep) => prevStep + 1);
  };

  /**
   * 이전 단계로 돌아가는 함수
   */
  const handleBack = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  /**
   * 현재 단계에 해당하는 컴포넌트를 렌더링하는 함수
   * @returns {JSX.Element}
   */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoSettings
            onNext={handleNext}
            initialData={formData.BasicInfoData}
          />
        );
      case 2:
        return (
          <UserDetailsSettings
            onNext={handleNext}
            initialData={formData.UserDetailsData}
          />
        );
      case 3:
        return (
          <CategorySettings
            onNext={handleNext}
            initialData={formData.CategoryData}
          />
        );
      case 4:
        return (
          <PublisherSettings
            onNext={handleNext}
            initialData={formData.PublisherData}
          />
        );
      case 5:
        return <SettingComplete />;
      default:
        return <BasicInfoSettings onNext={handleNext} />;
    }
  };

  return (
    <div className="h-screen min-h-[800px]">
      <div className="flex justify-between py-10 px-6">
        <button className="w-4" onClick={handleBack}>
          <img src={backIcon} alt="back" />
        </button>
        <Progress value={step * 20} />
        <div className="w-4"></div>
      </div>
      <div className="flex justify-center pt-6 h-5/6">{renderStep()}</div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import BasicInfoSettings from "../components/BasicInfoSettings";
import CategorySettings from "../components/CategorySettings";
import UserDetailsSettings from "../components/UserDetailsSettings";
import PublisherSettings from "../components/PublisherSettings";
import SettingComplete from "@/components/SettingComplete";

/**
 * 회원가입 프로세스를 관리하는 컴포넌트
 * @returns {JSX.Element}
 */
const SignUp = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    BasicInfoData: {},
    UserDetailsData: {},
    CategoryData: {},
    PublisherData: {},
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
        return <BasicInfoSettings onNext={handleNext} />;
      case 2:
        return <UserDetailsSettings onNext={handleNext} />;
      case 3:
        return <CategorySettings onNext={handleNext} />;
      case 4:
        return <PublisherSettings onNext={handleNext} />;
      case 5:
        return <SettingComplete onNext={handleNext} />;
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

import React, { useState } from "react";
import BasicInformation from "../components/form/BasicInformation";
import CategorySelect from "../components/form/CategorySelect";
import DetailInformation from "../components/form/DetailInformation";
import PublisherSelect from "../components/form/PublisherSelect";
import SignUpComplete from "@/components/signup/SignUpComplete";
import SignUpHeader from "@/components/signup/SignUpHeader";

// app 컴포넌트에서 SignUp 컴포넌트로
// { initialValues = INITIAL_VALUES }
// prop 보낼 때 사용할 초기 값
// const INITIAL_VALUES = {
//   BasicInfoData: {
//     username: "",
//     email: "",
//     tel: "",
//   },
//   UserDetailsData: {
//     gender: "",
//     birthdate: "",
//   },
//   CategoryData: [],
//   PublisherData: [],
// };

const STEPS = {
  BASIC_INFO: 1,
  USER_DETAILS: 2,
  CATEGORY: 3,
  PUBLISHER: 4,
  COMPLETE: 5,
};

const STEP_TITLES = {
  [STEPS.BASIC_INFO]: "뉴스핏이 처음인가요?\n기본 정보를 알려주세요.",
  [STEPS.USER_DETAILS]: "맞춤 뉴스 제공을 위한 추가 정보를 알려주세요.",
  [STEPS.CATEGORY]: "관심있는 뉴스 주제를 선택해주세요.",
  [STEPS.PUBLISHER]: "구독하고 싶은 언론사를 선택해주세요.",
};

/**
 * 회원가입 프로세스를 관리하는 컴포넌트
 * @returns {JSX.Element}
 */
const SignUp = () => {
  const [step, setStep] = useState(STEPS.BASIC_INFO);

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
        case STEPS.BASIC_INFO:
          return { ...prevFormData, BasicInfoData: data };
        case STEPS.USER_DETAILS:
          return { ...prevFormData, UserDetailsData: data };
        case STEPS.CATEGORY:
          return { ...prevFormData, CategoryData: data };
        case STEPS.PUBLISHER:
          return { ...prevFormData, PublisherData: data };
        default:
          return prevFormData;
      }
    });
    setStep((prevStep) => prevStep + 1);
  };

  /**
   * 이전 단계로 돌아가는 함수
   */
  const handleBack = () => {
    setStep((prevStep) =>
      prevStep > STEPS.BASIC_INFO ? prevStep - 1 : prevStep
    );
  };

  /**
   * 현재 단계에 해당하는 컴포넌트를 렌더링하는 함수
   * @returns {JSX.Element}
   */
  const renderStepContent = () => {
    switch (step) {
      case STEPS.BASIC_INFO:
        return (
          <BasicInformation
            onNext={handleNext}
            initialData={formData.BasicInfoData}
            buttonText="계속하기"
          />
        );
      case STEPS.USER_DETAILS:
        return (
          <DetailInformation
            onNext={handleNext}
            initialData={formData.UserDetailsData}
          />
        );
      case STEPS.CATEGORY:
        return (
          <CategorySelect
            onNext={handleNext}
            initialData={formData.CategoryData}
            buttonText="계속하기"
          />
        );
      case STEPS.PUBLISHER:
        return (
          <PublisherSelect
            onNext={handleNext}
            initialData={formData.PublisherData}
            buttonText="계속하기"
          />
        );
      case STEPS.COMPLETE:
        return <SignUpComplete formData={formData} />;
      default:
        return <BasicInformation onNext={handleNext} buttonText="계속하기" />;
    }
  };

  return (
    <div className="flex justify-center h-screen min-h-[600px]">
      <div className="h-full w-full max-w-2xl ">
        <SignUpHeader handleBack={handleBack} step={step} />
        <div className="flex justify-center pt-6 h-5/6">
          {step !== STEPS.COMPLETE ? (
            <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
              <h2 className="text-3xl font-extrabold mb-3 break-keep whitespace-pre-line leading-normal">
                {STEP_TITLES[step]}
              </h2>
              {renderStepContent()}
            </div>
          ) : (
            <>{renderStepContent()}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

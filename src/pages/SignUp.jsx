import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInformation from "@/components/user/BasicInformation";
import CategorySelect from "@/components/user/CategorySelect";
import DetailInformation from "@/components/user/DetailInformation";
import PublisherSelect from "@/components/user/PublisherSelect";
import SignUpComplete from "@/components/user/SignUpComplete";
import Header from "@/components/ui/Header";
import { STEPS, STEP_TITLES } from "@/lib/constants";

const SignUp = () => {
  const [step, setStep] = useState(STEPS.BASIC_INFO);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberInfo: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      birth: "",
    },
    categories: [],
    publishers: [],
  });

  const handleNext = (data) => {
    setFormData((prev) => {
      switch (step) {
        case STEPS.BASIC_INFO:
          return { ...prev, memberInfo: data };
        case STEPS.USER_DETAILS:
          return { ...prev, memberInfo: data };
        case STEPS.CATEGORY:
          return { ...prev, categories: data };
        case STEPS.PUBLISHER:
          return { ...prev, publishers: data };
        default:
          return prev;
      }
    });
    setStep((prevStep) => prevStep + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case STEPS.BASIC_INFO:
        return <BasicInformation onNext={handleNext} buttonText="계속하기" />;
      case STEPS.USER_DETAILS:
        return (
          <DetailInformation
            onNext={handleNext}
            initialData={formData.memberInfo}
            buttonText="계속하기"
          />
        );
      case STEPS.CATEGORY:
        return <CategorySelect onNext={handleNext} buttonText="계속하기" />;
      case STEPS.PUBLISHER:
        return <PublisherSelect onNext={handleNext} buttonText="계속하기" />;
      case STEPS.COMPLETE:
        return <SignUpComplete formData={formData} />;
      default:
        navigate("/login");
        return;
    }
  };

  return (
    <div className="flex justify-center h-screen min-h-[750px]">
      <div className="h-full w-full max-w-2xl ">
        <Header handleBack={() => setStep(step - 1)} step={step} />
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

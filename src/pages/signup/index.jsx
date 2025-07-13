import { useState } from 'react';
import { useRouter } from 'next/router';
import { STEPS, STEP_TITLES } from '@/lib/constants';
import BasicInformation from '@/components/user/BasicInformation';
import CategorySelect from '@/components/user/CategorySelect';
import DetailInformation from '@/components/user/DetailInformation';
import PublisherSelect from '@/components/user/PublisherSelect';
import SignUpComplete from '@/components/user/SignUpComplete';
import Header from '@/components/ui/custom/Header';
import PageLayout from '@/components/ui/custom/PageLayout';
import useUserData from '@/hooks/useUserData';

const SignUp = () => {
  const { userData, updateMemberInfo, updateCategories, updatePublishers } =
    useUserData({ page: 'signup' });
  const router = useRouter();
  const [step, setStep] = useState(STEPS.BASIC_INFO);

  const handleSubmit = (data) => {
    if (step >= STEPS.COMPLETE) return;
    if (step === STEPS.BASIC_INFO || step === STEPS.USER_DETAILS) {
      updateMemberInfo(data);
    } else if (step === STEPS.CATEGORY) {
      updateCategories(data);
    } else if (step === STEPS.PUBLISHER) {
      updatePublishers(data);
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (step <= STEPS.BASIC_INFO) {
      router.push('/login');
    }
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <PageLayout page="signup">
      <Header onClickBack={handleBack} step={step} />
      <div className="flex justify-center pt-6 h-5/6">
        {step === STEPS.COMPLETE ? (
          <SignUpComplete userData={userData} />
        ) : (
          <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
            <h2 className="text-3xl font-extrabold mb-3 break-keep whitespace-pre-line leading-normal">
              {STEP_TITLES[step]}
            </h2>
            {step === STEPS.BASIC_INFO && (
              <BasicInformation
                memberInfo={userData.memberInfo}
                onSubmit={handleSubmit}
                buttonText="계속하기"
              />
            )}

            {step === STEPS.USER_DETAILS && (
              <DetailInformation
                memberInfo={userData.memberInfo}
                onSubmit={handleSubmit}
                buttonText="계속하기"
              />
            )}

            {step === STEPS.CATEGORY && (
              <CategorySelect
                userCategories={userData.categories}
                onSubmit={handleSubmit}
                buttonText="계속하기"
              />
            )}

            {step === STEPS.PUBLISHER && (
              <PublisherSelect
                userPublishers={userData.publishers}
                onSubmit={handleSubmit}
                buttonText="계속하기"
              />
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SignUp;

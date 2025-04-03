import { Button } from '@/components/ui/shadcn/button';
import successmark from '@/assets/successmark.svg';
import { useState } from 'react';
import { SpinnerIcon } from '@/components/ui/custom/Loading';
import usePutUserInfo from '@/hooks/queries/usePutUserInfo';
import usePutUserCategories from '@/hooks/queries/usePutUserCategories';
import usePutUserPublishers from '@/hooks/queries/usePutUserPublishers';

const SignUpComplete = ({ formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: updateUserInfo } = usePutUserInfo();
  const { mutateAsync: updateUserCategories } = usePutUserCategories();
  const { mutateAsync: updateUserPublishers } = usePutUserPublishers();

  if (
    !formData ||
    !formData.memberInfo ||
    !formData.categories ||
    !formData.publishers
  ) {
    console.error('Invalid formData');
    return <div>잘못된 데이터입니다.</div>;
  }

  const onClickStart = async () => {
    setIsLoading(true);
    try {
      await updateUserInfo(formData.memberInfo);
      await updateUserCategories(formData.categories);
      await updateUserPublishers(formData.publishers);

      window.location.replace('/');
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative items-center gap-6 w-10/12 max-w-2xl h-full min-h-96">
      <img
        className="w-1/3 max-w-40 mt-16"
        src={successmark.src}
        alt="completeIcon"
      />
      <h2 className="text-3xl font-extrabold mt-7">맞춤 설정 완료!</h2>
      <span className="text-lg font-bold text-txt-placeholder">
        뉴스핏을 시작할 준비가 되었어요.
        <br />
        지금 바로 맞춤 뉴스를 읽어보세요.
      </span>
      <Button
        className="absolute bottom-0"
        onClick={onClickStart}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <SpinnerIcon />
          </>
        ) : (
          '시작하기'
        )}
      </Button>
    </div>
  );
};

export default SignUpComplete;

import { Button } from '@/components/ui/shadcn/button';
import successmark from '@/assets/successmark.svg';
import { SpinnerIcon } from '@/components/ui/custom/Loading';
import useSignup from '@/hooks/queries/auth/useSignup';
import { useRouter } from 'next/router';
import { useToaster } from '@/contexts/ToasterProvider';

const SignUpComplete = ({ userData }) => {
  const router = useRouter();
  const toast = useToaster();
  const { mutate: signup, isPending } = useSignup();

  if (
    !userData ||
    !userData.memberInfo ||
    !userData.categories ||
    !userData.publishers
  ) {
    toast('error', '잘못된 접근입니다.');
    router.push('/user');
    return null;
  }

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
        onClick={() => signup(userData)}
        disabled={isPending}
      >
        {isPending ? (
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

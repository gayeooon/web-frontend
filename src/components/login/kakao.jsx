import useLogin from '@/hooks/queries/auth/useSignup';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/shadcn/button';
import kakao from '@/assets/kakao_logo.svg';
import { PageSpinner } from '@/components/ui/custom/Loading';
import { useToaster } from '@/contexts/ToasterProvider';

const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const KakaoLoginButton = () => {
  const toast = useToaster();

  return (
    <div className="h-14 w-full">
      <Button
        variant="kakao"
        onClick={() => toast('error', '지금은 회원가입만 지원됩니다.')}
      >
        <img className="h-2/6" src={kakao.src} alt="kakao_icon" />
        <span>카카오 로그인</span>
      </Button>
    </div>
  );
};

export const KakaoSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="kakao"
    onClick={() => (window.location.href = '/signup')}
  >
    <img className="h-[40%]" src={kakao.src} alt="kakao_icon" />
  </Button>
);

const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const { mutate: login } = useLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const KAKAO_FETCH_URL = `/member/oauth/kakao?code=${code}&redirect_uri=${REDIRECT_URI}`;
    login(KAKAO_FETCH_URL);
  }, []);

  return <PageSpinner />;
};

export default KakaoLogin;

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLogin from '@/hooks/queries/auth/useSignup';
import { Button } from '@/components/ui/shadcn/button';
import naver_white from '@/assets/naver_logo_white.svg';
import naver_green from '@/assets/naver_logo_green.svg';
import { PageSpinner } from '@/components/ui/custom/Loading';
import { useToaster } from '@/contexts/ToasterProvider';

const STATE = 'state';

export const NaverLoginButton = () => {
  const toast = useToaster();

  return (
    <div className="h-14 w-full">
      <Button
        variant="naver"
        onClick={() => toast('error', '지금은 회원가입만 지원됩니다.')}
      >
        <img className="h-2/6" src={naver_white.src} alt="naver_icon" />
        <span>네이버 로그인</span>
      </Button>
    </div>
  );
};

export const NaverSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="naver"
    onClick={() => (window.location.href = '/signup')}
  >
    <img className="h-[40%]" src={naver_green.src} alt="naver_icon" />
  </Button>
);

const NaverLogin = () => {
  const [searchParams] = useSearchParams();
  const { mutate: login } = useLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const NAVER_FETCH_URL = `/member/oauth/naver?code=${code}&state=${STATE}`;
    login(NAVER_FETCH_URL);
  }, []);

  return <PageSpinner />;
};

export default NaverLogin;

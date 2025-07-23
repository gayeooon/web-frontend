import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLogin from '@/hooks/queries/auth/useSignup';
import { Button } from '@/components/ui/shadcn/button';

import { PageSpinner } from '@/components/ui/custom/Loading';
import { useToaster } from '@/contexts/ToasterProvider';
import IcNaver from '@/assets/IcNaver';

const STATE = 'state';

export const NaverLoginButton = () => {
  const toast = useToaster();

  return (
    <div className="h-14 w-full">
      <Button
        variant="naver"
        onClick={() => toast('error', '지금은 회원가입만 지원됩니다.')}
      >
        <IcNaver white />
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
    <IcNaver />
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

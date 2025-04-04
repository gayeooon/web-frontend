import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLogin from '@/hooks/queries/auth/useLogin';
import { Button } from '@/components/ui/shadcn/button';
import naver_white from '@/assets/naver_logo_white.svg';
import naver_green from '@/assets/naver_logo_green.svg';
import { PageSpinner } from '@/components/ui/custom/Loading';

// const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
// const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
const STATE = 'state';
// const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

export const NaverLoginButton = () => (
  <div className="h-14 w-full">
    <Button variant="naver" onClick={() => (window.location.href = '/')}>
      <img className="h-2/6" src={naver_white.src} alt="naver_icon" />
      <span>네이버 로그인</span>
    </Button>
  </div>
);

export const NaverSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="naver"
    onClick={() => (window.location.href = '/signup')}
  >
    <img className="h-[40%]" src={naver_green.src} alt="naver_icon" />
  </Button>
);

export const NaverLogin = () => {
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

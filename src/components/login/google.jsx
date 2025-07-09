import useLogin from '@/hooks/queries/auth/useLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import google from '@/assets/google_logo.svg';
import { Button } from '@/components/ui/shadcn/button';
import { PageSpinner } from '@/components/ui/custom/Loading';

const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export const GoogleLoginButton = () => (
  <div className="h-14 w-full">
    <Button variant="google" onClick={() => (window.location.href = '/')}>
      <img className="h-2/6" src={google.src} alt="google_icon" />
      <span>구글 계정으로 로그인</span>
    </Button>
  </div>
);

export const GoogleSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="google"
    onClick={() => (window.location.href = '/signup')}
  >
    <img className="h-[40%]" src={google.src} alt="google_icon" />
  </Button>
);

export const GoogleLogin = () => {
  const [searchParams] = useSearchParams();
  const { mutate: login } = useLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const GOOGLE_FETCH_URL = `/member/oauth/google?code=${code}&scope=email+profile&redirect_uri=${REDIRECT_URI}`;
    login(GOOGLE_FETCH_URL);
  }, []);

  return <PageSpinner />;
};

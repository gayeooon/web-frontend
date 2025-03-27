import { useAuth } from '@/contexts/AuthProvider';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import google from '@/assets/google_logo.svg';
import { Button } from '@/components/ui/shadcn/button';
import { PageSpinner } from '@/components/ui/custom/Loading';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

export const GoogleLoginButton = () => (
  <div className="h-14 w-full">
    <Button
      variant="google"
      onClick={() => (window.location.href = GOOGLE_AUTH_URL)}
    >
      <img className="h-2/6" src={google} alt="google_icon" />
      <span>구글 계정으로 로그인</span>
    </Button>
  </div>
);

export const GoogleSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="google"
    onClick={() => (window.location.href = GOOGLE_AUTH_URL)}
  >
    <img className="h-[40%]" src={google} alt="google_icon" />
  </Button>
);

export const GoogleLogin = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;
    const GOOGLE_FETCH_URL = `/member/oauth/google?code=${code}&scope=email+profile&redirect_uri=${REDIRECT_URI}`;

    login.mutate(GOOGLE_FETCH_URL);
  }, []);

  return <PageSpinner />;
};

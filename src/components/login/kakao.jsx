import useLogin from '@/hooks/queries/auth/useLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/shadcn/button';
import kakao from '@/assets/kakao_logo.svg';
import { PageSpinner } from '@/components/ui/custom/Loading';

// const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const KakaoLoginButton = () => (
  <div className="h-14 w-full">
    <Button variant="kakao" onClick={() => (window.location.href = '/')}>
      <img className="h-2/6" src={kakao.src} alt="kakao_icon" />
      <span>카카오 로그인</span>
    </Button>
  </div>
);

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

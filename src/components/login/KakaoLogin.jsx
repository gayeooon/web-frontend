import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import kakao from "@/assets/kakao_logo.svg";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const handleKakaoClick = () => {
  window.location.href = KAKAO_AUTH_URL;
};

export const KakaoLoginButton = () => (
  <div className="h-14 w-full">
    <Button
      variant="kakao"
      onClick={() => (window.location.href = KAKAO_AUTH_URL)}
    >
      <img className="h-2/6" src={kakao} alt="kakao_icon" />
      <span>카카오 로그인</span>
    </Button>
  </div>
);

export const KakaoSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="kakao"
    onClick={() => (window.location.href = KAKAO_AUTH_URL)}
  >
    <img className="h-[40%]" src={kakao} alt="kakao_icon" />
  </Button>
);
export const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;
    const KAKAO_FETCH_URL = `/member/oauth/kakao?code=${code}&redirect_uri=${REDIRECT_URI}`;

    login.mutate(KAKAO_FETCH_URL);
  }, []);

  return <div>카카오 로그인 처리중...</div>;
};

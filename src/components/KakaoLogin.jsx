import kakao from "../assets/kakao_logo.svg";
import { Button } from "./ui/button";

const KakaoLogin = () => {
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const kakaoRedirectURL = "http://localhost:5173/";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectURL}&response_type=code&prompt=login`;

  const loginURL = () => {
    const width = 450;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      KAKAO_AUTH_URL,
      "KakaoLogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="h-14 w-full">
      <Button variant="kakao" onClick={loginURL}>
        <img className="h-2/6" src={kakao} alt="kakao_icon" />
        <span>카카오 로그인</span>
      </Button>
    </div>
  );
};

export default KakaoLogin;

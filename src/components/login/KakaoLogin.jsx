import kakao from "@/assets/kakao_logo.svg";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
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
=======
const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
// const redirectURI = "http://localhost:5173/member/oauth/kakao";
const redirectURI = "https://www.newsfit.shop/member/oauth/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;

export const handleKakaoClick = () => {
  window.location.href = KAKAO_AUTH_URL;
>>>>>>> 5774009 (feature: implement Kakao OAuth login flow)
};

const authKakaoLogin = async (code) => {
  const response = await fetch(
    `https://www.newsfit.shop/member/oauth/kakao?code=${code}`,
    {
      method: "GET",
      mode: "no-cors", // CORS 비활성화
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Login failed");
  }
  // return await response.json();
  return response;
};

export const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const code = new URL(window.location.href).searchParams.get("code");
    const code = import.meta.env.VITE_KAKAO_TOKEN;

    const processLogin = async () => {
      try {
        const response = await authKakaoLogin(code);
        if (response.type === "opaque") {
          console.log("Login request sent");
          // 여기서 성공했다고 가정하고 처리
          navigate("/");
        }
      } catch (error) {
        console.log("Login error:", error);
        navigate("/login"); // 에러 시 로그인 페이지로
      }
    };

    if (code) {
      processLogin();
    }
  }, []);

  return <div>로그인 중...</div>;
};

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const handleKakaoClick = () => {
  window.location.href = KAKAO_AUTH_URL;
};

const authKakaoLogin = async (code) => {
  const response = await fetch(
    `https://www.newsfit.shop/member/oauth/kakao?code=${code}&redirect_uri=${REDIRECT_URI}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = response.json();
  return data;
};

export const KakaoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    const processLogin = async () => {
      try {
        const response = await authKakaoLogin(code);
        if (response.statusCode === 200) navigate("/user", { replace: true });
        else if (response.statusCode === 201)
          navigate("/signup", { replace: true });

        console.log(response);
      } catch (error) {
        console.log("Login error:", error);
        navigate("/login", { replace: true });
      }
    };

    if (code) {
      processLogin();
    }
  }, []);

  return <div>로그인 중...</div>;
};

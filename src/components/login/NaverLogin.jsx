import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/member/oauth/naver";
const STATE = "state";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

export const handleNaverClick = () => {
  window.location.href = NAVER_AUTH_URL;
};

const authNaverLogin = async (code) => {
  const response = await fetch(
    `https://www.newsfit.shop/member/oauth/naver?code=${code}&state=${STATE}`,
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

export const NaverLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    const processLogin = async () => {
      try {
        const response = await authNaverLogin(code);
        if (response.statusCode === 200) navigate("/", { replace: true });
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

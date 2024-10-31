import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/member/oauth/google";
// const REDIRECT_URI = "https://www.newsfit.shop/member/oauth/google";

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email`;
// https://accounts.google.com/o/oauth2/v2/auth?client_id=1059753127218-vlcutdr3ecma7tn6h6ak0h8h9pbhnp6g.apps.googleusercontent.com&redirect_uri=https://www.newsfit.shop/member/oauth/google&response_type=code&scope=email
export const handleGoogleClick = () => {
  window.location.href = GOOGLE_AUTH_URL;
};

const authGoogleLogin = async (code) => {
  const response = await fetch(
    `https://www.newsfit.shop/member/oauth/google?code=${code}&scope=email+profile&redirect_uri=${REDIRECT_URI}`,
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
  return response;
};

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    const processLogin = async () => {
      try {
        const response = await authGoogleLogin(code);
        if (response.status === 200) navigate("/user");
        else if (response.status === 201) navigate("/signup");
        console.log(response);
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

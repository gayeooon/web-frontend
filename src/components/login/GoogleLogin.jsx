import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}.apps.googleusercontent.com&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

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

  const data = response.json();
  return data;
};

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    const processLogin = async () => {
      try {
        const response = await authGoogleLogin(code);
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

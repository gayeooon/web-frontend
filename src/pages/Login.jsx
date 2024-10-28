import { useNavigate } from "react-router-dom";
import { handleKakaoClick } from "@/components/login/KakaoLogin";
import { handleNaverClick } from "@/components/login/NaverLogin";
import { handleGoogleClick } from "@/components/login/GoogleLogin";
import { Button } from "@/components/ui/button";
import favicon from "@/assets/favicon.png";
import naver_white from "@/assets/naver_logo_white.svg";
import naver_green from "@/assets/naver_logo_green.svg";
import kakao from "@/assets/kakao_logo.svg";
import google from "@/assets/google_logo.svg";
import apple from "@/assets/apple_logo_white.png";
import logo from "@/assets/NewsFit.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center h-screen min-h-[900px]">
      <div className="relative flex flex-col items-center w-10/12 max-w-2xl h-full">
        <div className="absolute top-[10%] flex flex-col items-center w-full">
          <img
            className="w-1/3 max-w-40 rounded-3xl rounded-md"
            src={favicon}
            alt="favicon"
          />
          <div className="mt-7 w-60 h-20">
            <img className="w-full h-full" src={logo} alt="NewsFit" />
          </div>
        </div>
        <div className="absolute top-[50%] flex flex-col w-full gap-4">
          <div id="naverIdLogin" className="h-14 w-full">
            <Button variant="naver" onClick={handleNaverClick}>
              <img className="h-2/6" src={naver_white} alt="naver_icon" />
              <span>네이버 로그인</span>
            </Button>
          </div>
          <div className="h-14 w-full">
            <Button variant="kakao" onClick={handleKakaoClick}>
              <img className="h-2/6" src={kakao} alt="kakao_icon" />
              <span>카카오 로그인</span>
            </Button>
          </div>
          <div className="h-14 w-full">
            <Button variant="google" onClick={handleGoogleClick}>
              <img className="h-2/6" src={google} alt="google_icon" />
              <span>구글 계정으로 로그인</span>
            </Button>
          </div>
          <div className="flex items-center w-full mt-10">
            <div className="flex-grow border-t border-border"></div>
            <span className="text-sm font-bold px-6 text-txt-placeholder">
              또는 가입하기
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>
          <div className="flex gap-8 mt-2">
            <Button
              className="bg-white border-[1px] border-border"
              variant="naver"
              onClick={handleSignupClick}
            >
              <img className="h-[40%]" src={naver_green} alt="naver_icon" />
            </Button>
            <Button
              className="bg-white border-[1px] border-border"
              variant="kakao"
              onClick={handleSignupClick}
            >
              <img className="h-[40%]" src={kakao} alt="kakao_icon" />
            </Button>
            <Button
              className="bg-white border-[1px] border-border"
              variant="apple"
              onClick={handleSignupClick}
            >
              <img className="h-[40%]" src={google} alt="google_icon" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

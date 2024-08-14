import NaverLogin from "@/components/NaverLogin";
import { Button } from "@/components/ui/button";
import favicon from "../assets/favicon.png";
import naver from "../assets/naver_logo_white.svg";
import kakao from "../assets/kakao_logo.svg";

const Login = () => {
  return (
    <div className="flex justify-center h-screen min-h-[800px]">
      <div className="relative flex flex-col items-center w-10/12 max-w-2xl h-full">
        <img
          className="w-1/3 max-w-40 mt-16 rounded-3xl rounded-md"
          src={favicon}
          alt="favicon"
        />
        <h2 className="text-6xl font-extrabold mt-7">NewsFit</h2>
        <div className="absolute top-1/2 flex flex-col w-full gap-4">
          <NaverLogin />
          <Button variant="kakao">
            <img className="h-2/6" src={kakao} alt="kakao_icon" />
            <span>카카오 로그인</span>
          </Button>
          <Button variant="apple">애플 로그인</Button>
          <div className="flex items-center w-full mt-10">
            <div className="flex-grow border-t border-border"></div>
            <span className="text-sm font-bold px-6 text-txt-placeholder">
              또는 가입하기
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>
          <div className="flex gap-8 mt-2">
            <Button variant="naver">
              <img className="h-2/6" src={naver} alt="naver_icon" />
            </Button>
            <Button variant="kakao">
              <img className="h-2/6" src={kakao} alt="kakao_icon" />
            </Button>
            <Button variant="apple"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

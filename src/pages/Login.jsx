import NaverLogin from "@/components/NaverLogin";
import { Button } from "@/components/ui/button";
import favicon from "../assets/favicon.png";

import kakao from "../assets/kakao_logo.svg";

const Login = () => {
  return (
    <div className="flex justify-center h-screen min-h-[800px]">
      <div className="flex flex-col items-center w-10/12 max-w-2xl h-full">
        <img
          className="w-1/3 max-w-40 mt-16 rounded-3xl rounded-md"
          src={favicon}
          alt="favicon"
        />
        <h2 className="text-6xl font-extrabold mt-7">NewsFit</h2>
        <NaverLogin />
        <Button variant="kakao">
          <img className="h-2/6" src={kakao} alt="kakao_icon" />
          <span>카카오 로그인</span>
        </Button>
        <Button variant="apple">애플</Button>
      </div>
    </div>
  );
};

export default Login;

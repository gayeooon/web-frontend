import { KakaoLoginButton, KakaoSignupButton } from '@/components/login/kakao';
import { NaverLoginButton, NaverSignupButton } from '@/components/login/naver';
import {
  GoogleLoginButton,
  GoogleSignupButton,
} from '@/components/login/google';
import PageLayout from '@/components/ui/custom/PageLayout';
import favicon from '../../../public/favicon.png';
import IcNewsFit from '@/assets/IcNewsFit';

const Login = () => {
  return (
    <PageLayout page="login">
      <div className="absolute top-[10%] flex flex-col items-center w-full">
        <img
          className="w-1/3 max-w-40 rounded-3xl rounded-md"
          src={favicon.src}
          alt="favicon"
        />
        <div className="flex justify-center mt-7 w-60 h-20">
          <IcNewsFit />
        </div>
      </div>
      <div className="absolute top-[50%] flex flex-col w-full gap-4">
        <NaverLoginButton />
        <KakaoLoginButton />
        <GoogleLoginButton />
        <div className="flex items-center w-full mt-10">
          <div className="flex-grow border-t border-border"></div>
          <span className="text-sm font-bold px-6 text-txt-placeholder">
            또는 가입하기
          </span>
          <div className="flex-grow border-t border-border"></div>
        </div>
        <div className="flex gap-8 mt-2">
          <NaverSignupButton />
          <KakaoSignupButton />
          <GoogleSignupButton />
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;

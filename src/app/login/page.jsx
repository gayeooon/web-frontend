import {
  KakaoLoginButton,
  KakaoSignupButton,
} from '@/app/member/oauth/kakao/page';
import {
  NaverLoginButton,
  NaverSignupButton,
} from '@/app/member/oauth/naver/page';
import {
  GoogleLoginButton,
  GoogleSignupButton,
} from '@/app/member/oauth/google/page';
import PageLayout from '@/components/ui/custom/PageLayout';
import favicon from '../../../public/favicon.png';
import logo from '@/assets/NewsFit.svg';

const Login = () => {
  return (
    <PageLayout page="login">
      <div className="absolute top-[10%] flex flex-col items-center w-full">
        <img
          className="w-1/3 max-w-40 rounded-3xl rounded-md"
          src={favicon.src}
          alt="favicon"
        />
        <div className="mt-7 w-60 h-20">
          <img className="w-full h-full" src={logo.src} alt="NewsFit" />
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

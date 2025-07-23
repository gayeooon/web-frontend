import { Button } from '@/components/ui/shadcn/button';
import { useToaster } from '@/contexts/ToasterProvider';
import IcGoogle from '@/assets/IcGoogle';

// const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export const GoogleLoginButton = () => {
  const toast = useToaster();

  return (
    <div className="h-14 w-full">
      <Button
        variant="google"
        onClick={() => toast('error', '지금은 회원가입만 지원됩니다.')}
      >
        <IcGoogle width="20" height="20" />
        <span>구글 계정으로 로그인</span>
      </Button>
    </div>
  );
};

export const GoogleSignupButton = () => (
  <Button
    className="bg-white border-[1px] border-border"
    variant="google"
    onClick={() => (window.location.href = '/signup')}
  >
    <IcGoogle width="26" height="26" />
  </Button>
);

// export const GoogleLogin = () => {
//   const [searchParams] = useSearchParams();
//   const { mutate: login } = useLogin();

//   useEffect(() => {
//     const code = searchParams.get('code');
//     if (!code) return;

//     const GOOGLE_FETCH_URL = `/member/oauth/google?code=${code}&scope=email+profile&redirect_uri=${REDIRECT_URI}`;
//     login(GOOGLE_FETCH_URL);
//   }, []);

//   return <PageSpinner />;
// };

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/contexts/AuthProvider";
import { UserProvider } from "@/contexts/UserProvider";
import ScrollToTop from "@/components/ui/custom/ScrollToTop";
import SignUp from "@/pages/SignUp";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import User from "@/pages/User";
import Setting from "@/pages/Setting";
import Search from "@/pages/Search";
import { KakaoLogin } from "@/components/login/KakaoLogin";
import { GoogleLogin } from "@/components/login/GoogleLogin";
import { NaverLogin } from "@/components/login/NaverLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member/oauth">
            <Route path="kakao" element={<KakaoLogin />} />
            <Route path="google" element={<GoogleLogin />} />
            <Route path="naver" element={<NaverLogin />} />
          </Route>
          <Route path="/user">
            <Route index element={<User />} />
            <Route path="info" element={<Setting variant="info" />} />
            <Route path="category" element={<Setting variant="category" />} />
            <Route path="publisher" element={<Setting variant="publisher" />} />
            <Route path="delete" element={<Setting variant="delete" />} />
          </Route>
          <Route path="*" element={<h3>없는 페이지</h3>} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

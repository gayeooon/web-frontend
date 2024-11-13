import SignUp from "@/pages/SignUp";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import User from "@/pages/User";
import Setting from "@/pages/Setting";
import Search from "@/pages/Search";
import { Routes, Route } from "react-router-dom";
import { KakaoLogin } from "./components/login/KakaoLogin";
import { GoogleLogin } from "./components/login/GoogleLogin";
import { NaverLogin } from "./components/login/NaverLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollToTop from "@/components/ui/custom/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/member/oauth/kakao" element={<KakaoLogin />} />
        <Route path="/member/oauth/google" element={<GoogleLogin />} />
        <Route path="/member/oauth/naver" element={<NaverLogin />} />
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
    </QueryClientProvider>
  );
};

export default App;

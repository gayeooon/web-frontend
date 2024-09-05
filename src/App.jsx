import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import { Routes, Route } from "react-router-dom";
import IsLoginContext from "./components/contexts/IsLoginContext";
import Settings from "./pages/settings/Settings";
import UserDetailsSettings from "./components/settings/UserDetailsSettings";
import SettingComplete from "./components/signup/SignUpComplete";

const App = () => {
  // App 컴포넌트에서 할 일
  // 1. 로그인 상태 context로 내려주기
  // 2. 회원 정보 내려주기
  // 3. 회원 정보 관리 (SignUp 컴포넌트와 정보 관리 어떻게?)

  return (
    <IsLoginContext.Provider value={false}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/settings" element={<Settings />}>
          <Route path="user-info" element={<SettingComplete />} />
        </Route>
        <Route path="*" element={<h3>없는 페이지</h3>} />
      </Routes>
    </IsLoginContext.Provider>
  );
};

export default App;

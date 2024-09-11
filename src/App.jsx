import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import UserInfoSettings from "./pages/settings/UserInfoSettings";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import IsLoginContext from "./components/contexts/IsLoginContext";

const App = () => {
  // App 컴포넌트에서 할 일
  // 1. 로그인 상태 context로 내려주기
  // 2. 회원 정보 내려주기
  // 3. 회원 정보 관리 (SignUp 컴포넌트와 정보 관리 어떻게?)

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    BasicInfoData: {
      username: "",
      email: "",
      tel: "",
    },
    UserDetailsData: {
      gender: "",
      birthdate: "",
    },
    CategoryData: [],
    PublisherData: [],
  });

  const login = (userData) => {
    setIsLogin(true);
    setUserInfo(userData);
  };

  const logout = () => {
    setIsLogin(false);
    setUserInfo(null);
  };

  const updateUserInfo = (newUserInfo) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...newUserInfo }));
  };

  const contextValue = {
    isLogin,
    userInfo,
    login,
    logout,
    updateUserInfo,
  };

  return (
    <IsLoginContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user">
          <Route index element={<User />} />
          <Route path="user-info" element={<UserInfoSettings />} />
          {/* <Route path="preferred-topics" element={<PreferredTopicsSettings />} />
          <Route path="publishers" element={<PublisherSettings />} /> */}
        </Route>

        <Route path="*" element={<h3>없는 페이지</h3>} />
      </Routes>
    </IsLoginContext.Provider>
  );
};

export default App;

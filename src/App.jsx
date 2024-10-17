import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import Setting from "./pages/Setting";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import IsLoginContext from "./contexts/IsLoginContext";

const App = () => {
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

  const updateUserInfo = (key, value) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [key]: value }));
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
          <Route path="info" element={<Setting variant="info" />} />
          <Route path="category" element={<Setting variant="category" />} />
          <Route path="publisher" element={<Setting variant="publisher" />} />
          <Route path="delete" element={<Setting variant="delete" />} />
        </Route>
        <Route path="*" element={<h3>없는 페이지</h3>} />
      </Routes>
    </IsLoginContext.Provider>
  );
};

export default App;

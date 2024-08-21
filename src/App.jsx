import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import IsLoginContext from "./components/contexts/IsLoginContext";

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
      </Routes>
    </IsLoginContext.Provider>
  );
};

export default App;

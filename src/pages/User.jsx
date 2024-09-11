import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import my from "../assets/my.svg";
import { useContext } from "react";
import IsLoginContext from "@/components/contexts/IsLoginContext";

const User = () => {
  const { userInfo } = useContext(IsLoginContext);
  const userName = userInfo.BasicInfoData.username;
  return (
    <div className="flex justify-center h-screen min-h-[600px] bg-background">
      <div className="relative flex flex-col items-center box-content p-16 w-10/12 max-w-2xl h-full bg-white rounded-2xl">
        <div className="border-b w-full ">
          <h3 className="py-8 text-3xl font-extrabold">{userName}</h3>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/user-info"
            className="flex py-5 w-full font-bold transition-all hover:underline"
          >
            회원정보 수정
          </Link>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/category-select"
            className="flex py-5 w-full font-bold transition-all hover:underline"
          >
            선호 주제 변경
          </Link>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/publisher-select"
            className="flex py-5 w-full font-bold transition-all hover:underline"
          >
            뉴스 구독 관리
          </Link>
        </div>
        <div className="border-b w-full ">
          <button className="flex py-5 w-full font-bold transition-all hover:underline ">
            로그아웃
          </button>
        </div>
        <div className="border-b w-full ">
          <button className="flex py-5 w-full font-bold transition-all hover:underline ">
            회원탈퇴
          </button>
        </div>
      </div>
      {/* 네비게이션 */}
      <div className="nav-bar">
        <div className="flex flex-col justify-center items-center w-6 gap-1">
          <img src={home} alt="home-icon" />
          <div className="text-xs">홈</div>
        </div>
        <div className="flex flex-col justify-center items-center w-6 gap-1">
          <img src={search} alt="search-icon" />
          <div className="text-xs">검색</div>
        </div>
        <div className="flex flex-col justify-center items-center w-6 gap-1">
          <img src={my} alt="my-icon" />
          <div className="text-xs">마이</div>
        </div>
      </div>
    </div>
  );
};

export default User;

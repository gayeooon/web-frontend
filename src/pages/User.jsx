import { Link } from "react-router-dom";
import LogoutDrawer from "@/components/setting/LogoutDrawer";
import NavigationBar from "@/components/common/NavigationBar";

const User = () => {
  return (
    <div className="flex justify-center h-screen min-h-[600px] bg-background/30 ">
      <div className="relative flex flex-col items-center px-14 py-4 w-full max-w-2xl h-full bg-white">
        <div className="border-b w-full ">
          <h3 className="py-8 text-3xl font-extrabold">마이페이지</h3>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/info"
            className="flex py-5 w-full font-bold hover:underline"
          >
            회원정보 수정
          </Link>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/category"
            className="flex py-5 w-full font-bold hover:underline"
          >
            선호 주제 변경
          </Link>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/publisher"
            className="flex py-5 w-full font-bold hover:underline"
          >
            뉴스 구독 관리
          </Link>
        </div>
        <div className="border-b w-full ">
          <LogoutDrawer />
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/delete"
            className="flex py-5 w-full font-bold hover:underline"
          >
            회원 탈퇴
          </Link>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default User;

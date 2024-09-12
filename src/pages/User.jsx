import { Link, useNavigate } from "react-router-dom";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import my from "../assets/my.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import IsLoginContext from "@/components/contexts/IsLoginContext";

const User = () => {
  const { logout } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex justify-center h-screen min-h-[600px] bg-background">
      <div className="relative flex flex-col items-center p-14 w-10/12 max-w-2xl h-full bg-white rounded-2xl">
        <div className="border-b w-full ">
          <h3 className="py-8 text-3xl font-extrabold">마이페이지</h3>
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
          <Drawer>
            <DrawerTrigger>
              <div className="flex py-5 w-full font-bold transition-all hover:underline ">
                로그아웃
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-xl">
                <DrawerHeader className="mt-4 ">
                  <DrawerTitle className="text-2xl font-bold mb-4">
                    로그아웃을 하시겠습니까?
                  </DrawerTitle>
                  <DrawerDescription>
                    새로운 소식을 받을 수 없게 됩니다.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <div className="flex gap-6">
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-1/2"
                    >
                      로그아웃
                    </Button>
                    <DrawerClose className="w-1/2">
                      <Button>취소</Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="border-b w-full ">
          <Link
            to="/user/account-delete"
            className="flex py-5 w-full font-bold transition-all hover:underline"
          >
            회원 탈퇴
          </Link>
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

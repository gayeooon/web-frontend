import home from "../assets/home.svg";
import search from "../assets/search.svg";
import my from "../assets/my.svg";
import Carousel from "@/components/main/Carousel";
import IsLoginContext from "@/contexts/IsLoginContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CategoryList from "@/components/main/CategoryList";
import Header from "@/components/main/Header";

const Home = () => {
  // const { islogin } = useContext(IsLoginContext);
  // if (!islogin) return <Navigate to="/login" />;
  return (
    <div className="flex flex-col">
      <Header />
      <CategoryList />
      <h2 className="text-xl font-extrabold m-6">헤드라인 뉴스</h2>
      <Carousel />
      <h2 className="text-xl font-extrabold m-6">구독한 언론사의 최신 뉴스</h2>

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

export default Home;

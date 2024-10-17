import Carousel from "@/components/main/Carousel";
import IsLoginContext from "@/contexts/IsLoginContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CategoryList from "@/components/main/CategoryList";
import Header from "@/components/main/Header";
import NewsList from "@/components/main/NewsList";
import NavigationBar from "@/components/common/NavigationBar";

const Home = () => {
  // const { islogin } = useContext(IsLoginContext);
  // if (!islogin) return <Navigate to="/login" />;
  return (
    <div className="flex flex-col py-5 mb-24">
      <Header />
      <CategoryList />
      <h2 className="text-xl font-extrabold m-6">헤드라인 뉴스</h2>
      <Carousel />
      <h2 className="text-xl font-extrabold m-6">구독한 언론사의 최신 뉴스</h2>
      <NewsList />
      <NavigationBar />
    </div>
  );
};

export default Home;

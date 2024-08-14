import like from "../assets/like.svg";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import my from "../assets/my.svg";
import { Button } from "@/components/ui/button";
import NaverLogin from "@/components/NaverLogin";

const Home = () => {
  return (
    <div>
      <img src={like} alt="like-icon" />

      <h2 className="text-3xl font-bold">Home Page</h2>
      <h4 className="text-xl font-bold text-my-purple">purple</h4>
      <h4 className="text-xl font-bold text-my-green">green</h4>
      <h4 className="text-xl">나눔 고딕 400</h4>
      <h4 className="text-xl font-bold">나눔 고딕 700</h4>
      <h4 className="text-xl font-extrabold">나눔 고딕 800</h4>
      <h2>Buttons</h2>
      <div>
        <div className="button bg-bt-default ">default</div>
        <div className="button bg-bt-disabled">disabled</div>
      </div>
      <h2>Navigation bar</h2>
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
      <h2>Input</h2>
      <div className="m-4">
        <div className="input">
          <div className="input-label">label</div>
          <input type="text" name="username" placeholder="username" />
        </div>
      </div>
      <Button>계속하기</Button>
      <Button disabled variant="destructive">
        계속하기
      </Button>
      <NaverLogin />
    </div>
  );
};

export default Home;

import { Outlet } from "react-router-dom";
import backIcon from "@/assets/back.svg";

const Settings = () => {
  return (
    <div className="h-screen min-h-[800px]">
      <div className="flex justify-between py-10 px-6">
        <button className="w-4">
          <img src={backIcon} alt="back" />
        </button>
        <span>설정</span>
        <div className="w-4"></div>
      </div>
      <div className="flex justify-center pt-6 h-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;

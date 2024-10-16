import { useNavigate } from "react-router-dom";
import logo from "@/assets/NewsFit.svg";

export default function Header() {
  return (
    <div className="flex justify-between py-6 px-6">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="back" className="w-full h-8" />
      </button>
    </div>
  );
}

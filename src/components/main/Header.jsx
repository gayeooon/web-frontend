import { useNavigate } from "react-router-dom";
import logo from "@/assets/NewsFit.svg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between pt-8 px-6">
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

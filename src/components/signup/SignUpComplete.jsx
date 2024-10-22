import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import IsLoginContext from "@/contexts/IsLoginContext";
import successmark from "@/assets/successmark.svg";
import { Button } from "../ui/button";

const SignUpComplete = ({ formData }) => {
  const { login } = useContext(IsLoginContext);
  const navigate = useNavigate();
  const onClickStart = () => {
    login(formData);
    navigate("/");
  };

  return (
    <div className="flex flex-col relative items-center gap-6 w-10/12 max-w-2xl h-full min-h-96">
      <img
        className="w-1/3 max-w-40 mt-16"
        src={successmark}
        alt="completeIcon"
      />
      <h2 className="text-3xl font-extrabold mt-7">맞춤 설정 완료!</h2>
      <span className="text-lg font-bold text-txt-placeholder">
        뉴스핏을 시작할 준비가 되었어요.
        <br />
        지금 바로 맞춤 뉴스를 읽어보세요.
      </span>
      <Button className="absolute bottom-0" onClick={onClickStart}>
        시작하기
      </Button>
    </div>
  );
};

export default SignUpComplete;

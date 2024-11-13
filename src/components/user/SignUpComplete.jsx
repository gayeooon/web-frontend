import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  updateMemberInfo,
  updatePublishers,
  updateCategories,
} from "@/lib/api";
import { Button } from "@/components/ui/shadcn/button";
import successmark from "@/assets/successmark.svg";

const SignUpComplete = ({ formData }) => {
  const navigate = useNavigate();

  console.log(formData);

  if (
    !formData ||
    !formData.memberInfo ||
    !formData.categories ||
    !formData.publishers
  ) {
    console.error("Invalid formData");
    return <div>잘못된 데이터입니다.</div>;
  }

  const fetchFormData = () => {
    try {
      updateMemberInfo(formData.memberInfo);
      updateCategories(formData.categories);
      updatePublishers(formData.publishers);
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: fetchFormData,
    onSuccess: () => {
      navigate("/user");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const onClickStart = () => {
    mutation.mutate();
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

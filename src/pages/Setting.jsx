import { useNavigate } from "react-router-dom";
import SettingsHeader from "@/components/setting/SettingsHeader";
import BasicInformation from "@/components/form/BasicInformation";
import CategorySelect from "@/components/form/CategorySelect";
import PublisherSelect from "@/components/form/PublisherSelect";
import AccountDelete from "@/components/setting/AccountDelete";
import { useMutation } from "@tanstack/react-query";
import {
  updateMemberInfo,
  updatePublishers,
  updateCategories,
} from "@/lib/api";

const Setting = ({ variant }) => {
  const navigate = useNavigate();

  const variantConfig = {
    info: { title: "회원정보 수정", fetchFunction: updateMemberInfo },
    category: { title: "선호 주제 변경", fetchFunction: updateCategories },
    publisher: { title: "뉴스 구독 관리", fetchFunction: updatePublishers },
    delete: { title: "회원 탈퇴" },
  };

  const mutation = useMutation({
    mutationFn: variantConfig[variant].fetchFunction,
    onSuccess: () => {
      alert("저장되었습니다.");
      navigate("/user");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  const handleNext = (data) => {
    mutation.mutate(data);
  };

  const renderComponent = () => {
    switch (variant) {
      case "info":
        return <BasicInformation onNext={handleNext} buttonText="저장" />;
      case "category":
        return <CategorySelect onNext={handleNext} buttonText="저장" />;
      case "publisher":
        return <PublisherSelect onNext={handleNext} buttonText="저장" />;
      case "delete":
        return <AccountDelete />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex justify-center h-screen min-h-[600px]">
      <div className="h-full w-full max-w-2xl ">
        <SettingsHeader title={variantConfig[variant].title} />
        <div className="flex justify-center pt-6 h-5/6">
          <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;

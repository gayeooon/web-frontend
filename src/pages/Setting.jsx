import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import IsLoginContext from "@/contexts/IsLoginContext";
import SettingsHeader from "@/components/setting/SettingsHeader";
import BasicInformation from "@/components/form/BasicInformation";
import CategorySelect from "@/components/form/CategorySelect";
import PublisherSelect from "@/components/form/PublisherSelect";
import AccountDelete from "@/components/setting/AccountDelete";

const Setting = ({ variant }) => {
  const { updateUserInfo, userInfo } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const variantConfig = {
    info: { title: "회원정보 수정", updateData: "BasicInfoData" },
    category: { title: "선호 주제 변경", updateData: "CategoryData" },
    publisher: { title: "뉴스 구독 관리", updateData: "PublisherData" },
    delete: { title: "회원 탈퇴" },
  };

  const handleNext = (data) => {
    updateUserInfo(variantConfig[variant].updateData, data);
    alert("저장되었습니다.");
    navigate("/user");
  };

  const renderComponent = () => {
    switch (variant) {
      case "info":
        return (
          <BasicInformation
            onNext={handleNext}
            initialData={userInfo.BasicInfoData}
            buttonText="저장"
          />
        );
      case "category":
        return (
          <CategorySelect
            onNext={handleNext}
            initialData={userInfo.CategoryData}
            buttonText="저장"
          />
        );
      case "publisher":
        return (
          <PublisherSelect
            onNext={handleNext}
            initialData={userInfo.PublisherData}
            buttonText="저장"
          />
        );
      case "delete":
        return <AccountDelete />;
      default:
        return <></>;
    }
  };

  return (
    <div className="h-screen min-h-[800px]">
      <SettingsHeader title={variantConfig[variant].title} />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Setting;

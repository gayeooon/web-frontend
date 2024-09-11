import { useContext } from "react";
import PublisherSelect from "@/components/forms/PublisherSelect";
import IsLoginContext from "@/components/contexts/IsLoginContext";
import SettingsHeader from "./SettingsHeader";
import { useNavigate } from "react-router-dom";

const PublisherSettings = () => {
  const { updateUserInfo, userInfo } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const handleNext = (data) => {
    updateUserInfo("PublisherData", data);
    alert("저장되었습니다.");
    navigate("/user");
  };
  return (
    <div className="h-screen min-h-[800px]">
      <SettingsHeader title="뉴스 구독 관리" />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          <PublisherSelect
            onNext={handleNext}
            initialData={userInfo.PublisherData}
            buttonText="저장"
          />
        </div>
      </div>
    </div>
  );
};

export default PublisherSettings;

import { useContext } from "react";
import BasicInfoSettings from "@/components/settings/BasicInfoSettings";
import IsLoginContext from "@/components/contexts/IsLoginContext";
import SettingsHeader from "./SettingsHeader";

const UserInfoSettings = () => {
  const { userInfo } = useContext(IsLoginContext);
  console.log(userInfo);

  const handleNext = () => {};
  return (
    <div className="h-screen min-h-[800px]">
      <SettingsHeader title="회원정보 수정" />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          <BasicInfoSettings
            onNext={handleNext}
            initialData={userInfo.BasicInfoData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoSettings;

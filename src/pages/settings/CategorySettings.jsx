import { useContext } from "react";
import CategorySelect from "@/components/form/CategorySelect";
import IsLoginContext from "@/components/contexts/IsLoginContext";
import SettingsHeader from "./SettingsHeader";
import { useNavigate } from "react-router-dom";

const CategorySettings = () => {
  const { updateUserInfo, userInfo } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const handleNext = (data) => {
    updateUserInfo("CategoryData", data);
    alert("저장되었습니다.");
    navigate("/user");
  };
  return (
    <div className="h-screen min-h-[800px]">
      <SettingsHeader title="선호 주제 변경" />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          <CategorySelect
            onNext={handleNext}
            initialData={userInfo.CategoryData}
            buttonText="저장"
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySettings;

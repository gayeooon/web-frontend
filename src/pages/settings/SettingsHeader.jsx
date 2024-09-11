import backIcon from "@/assets/back.svg";

const SettingsHeader = ({ title }) => {
  return (
    <div className="flex justify-between py-10 px-6">
      <button className="w-4">
        <img src={backIcon} alt="back" />
      </button>
      <span className="text-lg font-extrabold">{title}</span>
      <div className="w-4"></div>
    </div>
  );
};

export default SettingsHeader;

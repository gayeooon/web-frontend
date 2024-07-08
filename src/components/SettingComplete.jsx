import successmark from "../assets/successmark.svg";
const SettingComplete = ({ onNext }) => {
  const handleSubmit = () => {
    onNext();
  };
  return (
    <div className="flex flex-col items-center gap-6 w-10/12 max-w-2xl">
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
      <button
        className="button fixed bottom-16 bg-bt-default"
        onClick={handleSubmit}
      >
        시작하기
      </button>
    </div>
  );
};

export default SettingComplete;

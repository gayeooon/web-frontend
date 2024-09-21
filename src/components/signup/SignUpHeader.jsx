import { Progress } from "@/components/ui/progress";
import backIcon from "@/assets/back.svg";

const SignUpHeader = ({ handleBack, step }) => (
  <div className="flex justify-between py-10 px-6">
    <button className="w-4" onClick={handleBack}>
      <img src={backIcon} alt="back" />
    </button>
    <Progress value={step * 20} />
    <div className="w-4"></div>
  </div>
);

export default SignUpHeader;

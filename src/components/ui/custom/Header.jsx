import { Progress } from '@/components/ui/shadcn/progress';
import IcBack from '@/assets/IcBack';

const Header = ({ onClickBack, step = null, title = null }) => (
  <div className="flex justify-between py-10 px-6">
    <button className="w-4" onClick={onClickBack}>
      <IcBack />
    </button>
    {title ? (
      <span className="text-lg font-extrabold">{title}</span>
    ) : (
      <Progress value={step * 20} />
    )}
    <div className="w-4"></div>
  </div>
);

export default Header;

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/shadcn/radio-group';
import useGetUserInfo from '@/hooks/queries/useGetUserInfo';

const DetailInformation = ({ onNext, buttonText }) => {
  const [data, setData] = useState({});
  const { data: userInfo } = useGetUserInfo();

  useEffect(() => {
    if (userInfo) {
      setData({
        gender: userInfo.gender,
        birth: userInfo.birth,
      });
    }
  }, [userInfo]);

  const handleChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const today = new Date().toISOString().split('T')[0];
  return (
    <>
      <div className="border-2 border-border rounded-xl flex relative m-1 p-4">
        <div className="input-label">성별</div>
        <RadioGroup
          className="m-4"
          value={data.gender}
          onValueChange={(value) => {
            handleChange('gender', value);
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <RadioGroupItem value="MALE" id="MALE" />
            <label htmlFor="MALE">남성</label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="FEMALE" id="FEMALE" />
            <label htmlFor="FEMALE">여성</label>
          </div>
        </RadioGroup>
      </div>
      <div className="input">
        <div className="input-label">생년월일</div>
        <input
          type="date"
          name="birth"
          value={data.birth}
          onChange={(e) => handleChange('birth', e.target.value)}
          min="1900-01-01"
          max={today}
        />
      </div>

      <Button
        className="absolute bottom-0"
        onClick={() =>
          onNext({
            ...data,
            birth: data.birth,
          })
        }
        disabled={!(data.gender && data.birth)}
      >
        {buttonText}
      </Button>
    </>
  );
};
export default DetailInformation;

import React, { useState } from "react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * 사용자의 상세 정보를 입력받는 컴포넌트
 * @param {Object} props
 * @param {Function} props.onNext - 다음 단계로 넘어가는 함수
 * @returns {JSX.Element}
 */
const DetailInformation = ({ onNext, initialData }) => {
  const [data, setData] = useState(initialData);

  /**
   * 입력 필드 변경 핸들러
   * @param {React.ChangeEvent<HTMLInputElement>} e - 이벤트 객체
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 폼이 완성되었는지 확인하는 함수
   * @returns {boolean}
   */
  const isFormComplete = () => {
    return data.gender && data.birthdate;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    if (isFormComplete()) {
      onNext(data);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <div className="input ">
        <div className="input-label">성별</div>
        <RadioGroup
          className="m-4"
          value={data.gender}
          onValueChange={(value) => {
            setData((prev) => ({
              ...prev,
              gender: value,
            }));
          }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <RadioGroupItem value="male" id="male" />
            <label htmlFor="male">남성</label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="female" id="female" />
            <label htmlFor="female">여성</label>
          </div>
        </RadioGroup>
      </div>
      <div className="input">
        <div className="input-label">생년월일</div>
        <input
          className="w-full m-1"
          type="date"
          name="birthdate"
          value={data.birthdate}
          onChange={handleChange}
          min="1900-01-01"
          max={today}
        />
      </div>
      {isFormComplete() ? (
        <Button onClick={handleSubmit}>계속하기</Button>
      ) : (
        <Button disabled>계속하기</Button>
      )}
    </>
  );
};
export default DetailInformation;

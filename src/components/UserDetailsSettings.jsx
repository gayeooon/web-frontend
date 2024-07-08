import React, { useState } from "react";

/**
 * 사용자의 상세 정보를 입력받는 컴포넌트
 * @param {Object} props
 * @param {Function} props.onNext - 다음 단계로 넘어가는 함수
 * @returns {JSX.Element}
 */
const UserDetailsSettings = ({ onNext }) => {
  const [data, setData] = useState({
    gender: "",
    birthdate: "",
  });

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

  return (
    <div className="flex flex-col gap-6 w-10/12 max-w-2xl">
      <h2 className="text-3xl font-extrabold mb-9 w-full">
        맞춤 뉴스 제공을 위한
        <br />
        추가 정보를 알려주세요.
      </h2>
      <div className="input ">
        <div className="input-label">성별</div>
        <fieldset>
          <div className="m-3 mb-6">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male">남성</label>
          </div>
          <div className="m-3">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female">여성</label>
          </div>
        </fieldset>
      </div>
      <div className="input">
        <div className="input-label">생년월일</div>
        <input
          className="w-full m-1"
          type="date"
          name="birthdate"
          value={data.birthdate}
          onChange={handleChange}
        />
      </div>
      <button
        className={`button fixed bottom-16 ${
          isFormComplete() ? "bg-bt-default" : "bg-bt-disabled"
        }`}
        onClick={handleSubmit}
        disabled={!isFormComplete()}
      >
        계속하기
      </button>
    </div>
  );
};
export default UserDetailsSettings;

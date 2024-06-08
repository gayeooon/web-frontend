import React, { useState } from "react";

const UserDetailsSettings = ({ onNext }) => {
  const [data, setData] = useState({
    gender: "",
    birthdate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onNext(data);
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
        className="button bg-bt-default fixed bottom-16"
        type="button"
        onClick={handleSubmit}
      >
        계속하기
      </button>
    </div>
  );
};
export default UserDetailsSettings;

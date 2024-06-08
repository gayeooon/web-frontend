import React, { useState } from "react";

const BasicInfoSettings = ({ onNext }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    tel: "",
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
      <h2 className="text-3xl font-extrabold mb-9">
        뉴스핏이 처음인가요?
        <br />
        기본 정보를 알려주세요.
      </h2>
      <div className="input">
        <input
          className="w-full m-1"
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="이름"
        />
      </div>
      <div className="input">
        <div className="input-label">이메일</div>
        <input
          className="w-full m-1"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="info@example.com"
        />
      </div>
      <div className="input">
        <div className="input-label">전화번호</div>
        <input
          className="w-full m-1"
          type="tel"
          name="tel"
          value={data.tel}
          onChange={handleChange}
          placeholder="010 - 0000 - 0000"
        />
      </div>

      <button
        className="button bg-bt-default fixed bottom-16"
        onClick={handleSubmit}
      >
        계속하기
      </button>
    </div>
  );
};
export default BasicInfoSettings;

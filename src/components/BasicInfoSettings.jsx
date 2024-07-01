import React, { useState, useEffect } from "react";

const BasicInfoSettings = ({ onNext }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    tel: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    tel: "",
  });

  const validateField = (name, value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telPattern = /^010-\d{4}-\d{4}$/;

    let error = "";

    switch (name) {
      case "email":
        if (!emailPattern.test(value))
          error = "이메일 형식이 올바르지 않습니다.";
        break;
      case "tel":
        if (!telPattern.test(value))
          error = "전화번호 형식이 올바르지 않습니다.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "tel") {
      formattedValue = formatTel(value);
    }

    setData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    validateField(name, formattedValue);
  };

  const formatTel = (tel) => {
    const cleaned = tel.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        7
      )}-${cleaned.slice(7, 11)}`;
    }

    return formatted;
  };

  const isFormComplete = () => {
    return (
      !errors.email && !errors.tel && data.username && data.email && data.tel
    );
  };

  const handleSubmit = () => {
    if (isFormComplete()) {
      onNext(data);
    }
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
      {errors.email && <p className="text-red-500 ml-4">{errors.email}</p>}
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
      {errors.tel && <p className="text-red-500 ml-4">{errors.tel}</p>}

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
export default BasicInfoSettings;

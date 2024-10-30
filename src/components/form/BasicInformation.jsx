import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import IsLoginContext from "../../contexts/IsLoginContext";

/**
 * 사용자의 기본 정보를 입력받는 컴포넌트
 * @param {Object} props
 * @param {Function} props.onNext - 다음 단계로 넘어가는 함수
 * @returns {JSX.Element}
 */
const BasicInformation = ({ onNext, initialData, buttonText }) => {
  const { userInfo } = useContext(IsLoginContext);

  const [data, setData] = useState(initialData);

  const [errors, setErrors] = useState({
    email: "",
    tel: "",
  });

  /**
   * 입력 필드의 유효성을 검사하는 함수
   * @param {string} name - 필드 이름
   * @param {string} value - 필드 값
   */
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

  /**
   * 입력 필드 변경 핸들러
   * @param {React.ChangeEvent<HTMLInputElement>} e - 이벤트 객체
   */
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

  /**
   * 전화번호 형식을 포맷팅하는 함수
   * @param {string} tel - 포맷팅할 전화번호
   * @returns {string} 포맷팅된 전화번호
   */
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

  /**
   * 폼이 완성되었는지 확인하는 함수
   * @returns {boolean}
   */
  const isFormComplete = () => {
    return (
      !errors.email && !errors.tel && data.username && data.email && data.tel
    );
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
    <>
      <div className="input">
        <input
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
          type="tel"
          name="tel"
          value={data.tel}
          onChange={handleChange}
          placeholder="010 - 0000 - 0000"
        />
      </div>
      {errors.tel && <p className="text-red-500 ml-4">{errors.tel}</p>}

      {isFormComplete() ? (
        <Button className="absolute bottom-0" onClick={handleSubmit}>
          {buttonText}
        </Button>
      ) : (
        <Button className="absolute bottom-0" disabled>
          {buttonText}
        </Button>
      )}
    </>
  );
};
export default BasicInformation;

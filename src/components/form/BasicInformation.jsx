import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getMemberInfo } from "@/lib/api";

const BasicInformation = ({ onNext, buttonText }) => {
  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberInfo"],
    queryFn: getMemberInfo,
    select: (data) => ({
      name: data.result.nickname,
      email: data.result.email,
      phone: data.result.phone,
    }),
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const validateField = (name, value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^010-\d{4}-\d{4}$/;

    let error = "";

    switch (name) {
      case "email":
        if (!emailPattern.test(value))
          error = "이메일 형식이 올바르지 않습니다.";
        break;
      case "phone":
        if (!phonePattern.test(value))
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
    const newValue = name === "phone" ? formatPhone(value) : value;

    setData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };

  const formatPhone = (phone) => {
    const numbers = phone.replace(/\D/g, "");
    const parts = [
      numbers.slice(0, 3),
      numbers.slice(3, 7),
      numbers.slice(7, 11),
    ].filter(Boolean);

    return parts.join("-");
  };

  const isFormComplete = () => {
    return (
      !errors.email && !errors.phone && data.name && data.email && data.phone
    );
  };

  if (isLoading) {
    return (
      <>
        <div className="input">
          <div className="absolute animate-pulse bg-gray-200 rounded-xl w-[20%] h-[50%] ml-5"></div>
          <input onChange={handleChange} value="" />
        </div>
        <div className="input">
          <div className="absolute animate-pulse bg-gray-200 rounded-xl w-[50%] h-[50%] ml-5"></div>
          <input onChange={handleChange} value="" />
        </div>
        <div className="input">
          <div className="absolute animate-pulse bg-gray-200 rounded-xl w-[30%] h-[50%] ml-5"></div>
          <input onChange={handleChange} value="" />
        </div>
      </>
    );
  }

  if (error) {
    return <div>유저 데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      <div className="input">
        <input
          type="text"
          name="name"
          value={data.name}
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
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="010 - 0000 - 0000"
        />
      </div>
      {errors.phone && <p className="text-red-500 ml-4">{errors.phone}</p>}

      <Button
        className="absolute bottom-0"
        onClick={() => onNext(data)}
        disabled={!isFormComplete()}
      >
        {buttonText}
      </Button>
    </>
  );
};
export default BasicInformation;

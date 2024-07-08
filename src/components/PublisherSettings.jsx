import React, { useState } from "react";

const PublisherSettings = ({ onNext }) => {
  const [subscribedPublisher, setSubscribedPublisher] = useState([]);

  const publishers = [
    { id: 1, name: "SBS 연예뉴스", img: "💻" },
    { id: 2, name: "한국경제", img: "⚽" },
    { id: 3, name: "한국경제", img: "🔬" },
    { id: 4, name: "한국경제", img: "💰" },
    { id: 5, name: "SBS 연예뉴스", img: "💻" },
    { id: 6, name: "SBS 연예뉴스", img: "💻" },
    { id: 7, name: "SBS 연예뉴스", img: "💻" },
    { id: 8, name: "SBS 연예뉴스", img: "💻" },
  ];

  const toggleSubscribe = (publisherId) => {
    setSubscribedPublisher((prev) =>
      prev.includes(publisherId)
        ? prev.filter((id) => id !== publisherId)
        : [...prev, publisherId]
    );
  };

  /**
   * 구독 버튼이 선택되었는지 확인하는 함수
   * @param {number} publisherId - 확인할 언론사의 ID
   * @returns {boolean}
   */
  const isSelected = (publisherId) => subscribedPublisher.includes(publisherId);

  /**
   * 구독한 언론사의 개수를 확인하는 함수
   * @param {number} minCount - 최소 개수
   * @returns {boolean}
   */
  const hasMinimumSubscribe = (minCount = 3) => {
    return subscribedPublisher.length >= minCount;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    if (hasMinimumSubscribe()) {
      onNext(subscribedPublisher);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-10/12 max-w-2xl">
      <h2 className="text-3xl font-extrabold mb-3">
        구독하고 싶은 언론사를 선택해주세요.
      </h2>
      {hasMinimumSubscribe() ? (
        <></>
      ) : (
        <h3 className="mb-2 text-xl font-bold underline underline-offset-8 decoration-1">
          최소 3개 언론사를 구독하세요.
        </h3>
      )}
      <div className="flex flex-col gap-3">
        {publishers.map((publisher) => (
          <div key={publisher.id} className="flex justify-between w-full">
            <div className="flex">
              <span className="text-4xl mr-8">{publisher.img}</span>
              <span className="block mt-2 font-bold">{publisher.name}</span>
            </div>
            <button
              className={`subs_button ${
                isSelected(publisher.id) ? "bg-my-purple text-white" : ""
              }`}
              onClick={() => toggleSubscribe(publisher.id)}
            >
              {isSelected(publisher.id) ? "구독중" : "+ 구독"}
            </button>
          </div>
        ))}
      </div>
      <button
        className={`button fixed bottom-16 ${
          hasMinimumSubscribe() ? "bg-bt-default" : "bg-bt-disabled"
        }`}
        onClick={handleSubmit}
        disabled={!hasMinimumSubscribe()}
      >
        계속하기
      </button>
    </div>
  );
};

export default PublisherSettings;

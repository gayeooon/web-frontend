import React, { useState } from "react";
import { Button } from "../ui/button";

/**
 * 사용자의 관심 카테고리를 선택받는 컴포넌트
 * @param {Object} props
 * @param {Function} props.onNext - 다음 단계로 넘어가는 함수
 * @returns {JSX.Element}
 */
const CategorySelect = ({ onNext, initialData, buttonText }) => {
  const [selectedTopics, setSelectedTopics] = useState(initialData);

  const topics = [
    { id: 1, name: "정치", emoji: "🏛️" },
    { id: 2, name: "경제", emoji: "💰" },
    { id: 3, name: "사회", emoji: "👥" },
    { id: 4, name: "생활/문화", emoji: "🏠" },
    { id: 5, name: "세계", emoji: "🌏" },
    { id: 6, name: "기술/IT", emoji: "💻" },
    { id: 7, name: "연예", emoji: "🎤" },
    { id: 8, name: "스포츠", emoji: "⚽" },
  ];

  /**
   * 토픽 선택을 토글하는 함수
   * @param {number} topicId - 토글할 토픽의 ID
   */
  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  /**
   * 토픽이 선택되었는지 확인하는 함수
   * @param {number} topicId - 확인할 토픽의 ID
   * @returns {boolean}
   */
  const isSelected = (topicId) => selectedTopics.includes(topicId);

  /**
   * 선택한 토픽의 개수를 확인하는 함수
   * @param {number} minCount - 최소 개수
   * @returns {boolean}
   */
  const hasMinimumTopics = (minCount = 3) => {
    return selectedTopics.length >= minCount;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    if (hasMinimumTopics()) {
      onNext(selectedTopics);
    }
  };

  return (
    <>
      {hasMinimumTopics() ? (
        <></>
      ) : (
        <h3 className="mb-4 text-xl font-bold underline underline-offset-8 decoration-1">
          최소 3개 주제를 선택하세요.
        </h3>
      )}
      <div className="bg-white rounded-lg w-full text-center">
        <div className="flex flex-wrap gap-[3%] justify-center">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`cursor-pointer rounded-2xl p-4 border-2 w-[31%] flex-shrink-0 mb-[3%] ${
                isSelected(topic.id)
                  ? "bg-background border-my-purple"
                  : "bg-none border-border"
              }`}
              onClick={() => toggleTopic(topic.id)}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <span className="block mt-2 text-sm font-bold break-keep">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {hasMinimumTopics() ? (
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

export default CategorySelect;

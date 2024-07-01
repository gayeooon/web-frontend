import React, { useState } from "react";

const TopicSelection = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = [
    { id: 1, name: "IT", emoji: "💻" },
    { id: 2, name: "스포츠", emoji: "⚽" },
    { id: 3, name: "과학", emoji: "🔬" },
    { id: 4, name: "금융", emoji: "💰" },
    { id: 5, name: "IT", emoji: "💻" },
    { id: 6, name: "IT", emoji: "💻" },
    { id: 7, name: "IT", emoji: "💻" },
    { id: 8, name: "IT", emoji: "💻" },
  ];

  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const isSelected = (topicId) => selectedTopics.includes(topicId);

  const handleSubmit = () => {
    if (!(selectedTopics.length < 3)) {
      onNext(data);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-10/12 max-w-2xl">
      <h2 className="text-3xl font-extrabold mb-9">
        관심있는 뉴스 주제를 선택해주세요.
      </h2>
      <div className="bg-white rounded-lg p-6 w-full text-center">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`cursor-pointer rounded-lg p-4 border-2 ${
                isSelected(topic.id)
                  ? "bg-background border-my-purple"
                  : "bg-none border-border"
              }`}
              onClick={() => toggleTopic(topic.id)}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <span className="block mt-2 text-sm font-bold ">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`button fixed bottom-16 ${
          selectedTopics.length < 3 ? "bg-bt-disabled" : "bg-bt-default"
        }`}
        onClick={handleSubmit}
        disabled={!(selectedTopics.length < 3)}
      >
        계속하기
      </button>
    </div>
  );
};

export default TopicSelection;

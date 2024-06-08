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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-80 text-center">
        <h2 className="text-gray-600 mb-4">주제 선택</h2>
        <p className="text-gray-700 mb-6">
          관심있는 뉴스 주제를 선택해주세요.
          <br />
          최소 3개 주제를 선택하세요.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`cursor-pointer rounded-lg p-4 ${
                isSelected(topic.id) ? "bg-blue-100" : "bg-gray-100"
              }`}
              onClick={() => toggleTopic(topic.id)}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <span className="block mt-2 text-sm text-gray-800">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
        <button
          className="bg-gray-600 text-white py-2 px-4 rounded disabled:bg-gray-300 w-full"
          disabled={selectedTopics.length < 3}
          onClick={() => alert("계속하기 버튼 클릭됨")}
        >
          계속하기
        </button>
      </div>
    </div>
  );
};

export default TopicSelection;

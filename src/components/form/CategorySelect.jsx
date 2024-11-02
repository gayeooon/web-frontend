import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/api";

const MIN_SELECTIONS = 3;

const topics = [
  { id: "정치", name: "정치", emoji: "🏛️" },
  { id: "경제", name: "경제", emoji: "💰" },
  { id: "사회", name: "사회", emoji: "👥" },
  { id: "생활_문화", name: "생활/문화", emoji: "🏠" },
  { id: "세계", name: "세계", emoji: "🌏" },
  { id: "기술_IT", name: "기술/IT", emoji: "💻" },
  { id: "연예", name: "연예", emoji: "🎤" },
  { id: "스포츠", name: "스포츠", emoji: "⚽" },
];

const CategorySelect = ({ onNext, buttonText }) => {
  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.result.preferredCategories,
  });

  // 초기 상태는 빈 배열로 시작
  const [selectedTopics, setSelectedTopics] = useState([]);

  // initialCategories가 로드되면 selectedTopics 업데이트
  useEffect(() => {
    if (initialData) {
      setSelectedTopics(initialData);
    }
  }, [initialData]);

  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const isSelected = (topicId) => selectedTopics.includes(topicId);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-[3%] justify-center">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="animate-pulse bg-gray-200 rounded-2xl p-4 w-[31%] h-32 flex-shrink-0 mb-[3%]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>카테고리를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      {selectedTopics.length < MIN_SELECTIONS && (
        <h3 className="mb-4 text-xl font-bold underline underline-offset-8 decoration-1">
          {`최소 ${MIN_SELECTIONS}개 주제를 선택하세요.`}
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

      <Button
        className="absolute bottom-0"
        onClick={() => onNext(selectedTopics)}
        disabled={selectedTopics.length < MIN_SELECTIONS}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default CategorySelect;

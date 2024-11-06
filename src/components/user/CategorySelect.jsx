import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/api";
import { TOPICS, MIN_SELECTIONS } from "@/lib/constants";

const CategorySelect = ({ onNext, buttonText }) => {
  const {
    data: initialData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.result.preferredCategories,
  });

  const [selectedTopics, setSelectedTopics] = useState([]);

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

  // 로딩 상태 처리
  if (isPending) {
    return (
      <div className="flex flex-wrap gap-[3%] justify-center">
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="animate-pulse bg-gray-200 rounded-2xl p-4 w-[31%] h-32 flex-shrink-0 mb-[3%]"
          />
        ))}
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
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
          {TOPICS.map((topic) => (
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

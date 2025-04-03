import { useEffect, useState } from 'react';
import useGetUserCategories from '@/hooks/queries/useGetUserCategories';
import { Button } from '@/components/ui/shadcn/button';
import { TOPICS, MIN_SELECTIONS } from '@/lib/constants';
import { SpinnerIcon } from '@/components/ui/custom/Loading';

const CategorySelect = ({ onNext, buttonText, buttonDisabled }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { data: userCategories } = useGetUserCategories();

  useEffect(() => {
    if (userCategories) setSelectedTopics(userCategories);
  }, [userCategories]);

  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const isSelected = (topicId) => selectedTopics.includes(topicId);

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
                  ? 'bg-background border-my-purple'
                  : 'bg-none border-border'
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
        disabled={selectedTopics.length < MIN_SELECTIONS || buttonDisabled}
      >
        {buttonDisabled ? <SpinnerIcon /> : buttonText}
      </Button>
    </>
  );
};

export default CategorySelect;

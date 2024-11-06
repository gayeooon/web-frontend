import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublishers } from "@/lib/api";
import { PUBLISHERS, MIN_SUBSCRIPTIONS } from "@/lib/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const PublisherSelect = ({ onNext, buttonText }) => {
  const {
    data: initialData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: getPublishers,
    select: (data) => data.result.preferredPress,
  });

  const [subscribedPublisher, setSubscribedPublisher] = useState([]);

  useEffect(() => {
    if (initialData) {
      setSubscribedPublisher(initialData);
    }
  }, [initialData]);

  const toggleSubscribe = (publisher) => {
    setSubscribedPublisher((prev) =>
      prev.includes(publisher)
        ? prev.filter((id) => id !== publisher)
        : [...prev, publisher]
    );
  };

  const isSelected = (publisher) => subscribedPublisher.includes(publisher);

  // 로딩 상태 처리
  if (isPending) {
    return (
      <ScrollArea className="min-h-[350px] mb-20">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-12 mb-4 rounded-md" />
              <div className="bg-gray-100 h-8 mb-2 rounded" />
              <div className="bg-gray-100 h-8 mb-2 rounded" />
              <div className="bg-gray-100 h-8 mb-2 rounded" />
            </div>
          ))}
      </ScrollArea>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return <div>언론사 목록을 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      {subscribedPublisher.length < MIN_SUBSCRIPTIONS && (
        <h3 className="mb-2 text-xl font-bold underline underline-offset-8 decoration-1">
          {`최소 ${MIN_SUBSCRIPTIONS}개 언론사를 구독하세요.`}
        </h3>
      )}
      <ScrollArea className="min-h-[350px] mb-20">
        {PUBLISHERS.map((publisher) => (
          <div key={publisher.type}>
            <div className="sticky top-0 bg-background flex justify-between w-full p-3 rounded-md">
              <span className="block font-bold">{publisher.type}</span>
            </div>
            {publisher.list.map((it) => (
              <div key={it} className="flex justify-between w-full my-4 px-2">
                <div className="flex">
                  <span className="block mt-2 font-bold">{it}</span>
                </div>
                <button
                  className={`subs_button ${
                    isSelected(it) ? "bg-my-purple text-white" : ""
                  }`}
                  onClick={() => toggleSubscribe(it)}
                >
                  {isSelected(it) ? "구독중" : "+ 구독"}
                </button>
              </div>
            ))}
          </div>
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <Button
        className="absolute bottom-0"
        onClick={() => onNext(subscribedPublisher)}
        disabled={subscribedPublisher.length < MIN_SUBSCRIPTIONS}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default PublisherSelect;

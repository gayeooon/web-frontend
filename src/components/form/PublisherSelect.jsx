import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getPublishers } from "@/lib/api";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MIN_SUBSCRIPTIONS = 3;

const publishers = [
  {
    type: "종합",
    list: [
      "경향신문",
      "국민일보",
      "동아일보",
      "문화일보",
      "서울신문",
      "세계일보",
      "조선일보",
      "중앙일보",
      "한겨레",
      "한국일보",
    ],
  },
  {
    type: "방송/통신",
    list: [
      "뉴스1",
      "뉴시스",
      "연합뉴스",
      "연합뉴스TV",
      "채널A",
      "한국경제TV",
      "JTBC",
      "KBS",
      "MBC",
      "MBN",
      "SBS",
      "SBS Biz",
      "TV조선",
      "YTN",
    ],
  },
  {
    type: "경제",
    list: [
      "매일경제",
      "머니투데이",
      "비즈워치",
      "서울경제",
      "아시아경제",
      "이데일리",
      "조선비즈",
      "조세일보",
      "파이낸셜뉴스",
      "한국경제",
      "헤럴드경제",
    ],
  },
  {
    type: "인터넷",
    list: [
      "노컷뉴스",
      "더팩트",
      "데일리안",
      "머니S",
      "미디어오늘",
      "아이뉴스24",
      "오마이뉴스",
      "프레시안",
      "디지털데일리",
      "디지털타임스",
      "블로터",
      "전자신문",
      "지디넷코리아",
      "더스쿠프",
    ],
  },
  {
    type: "IT",
    list: [
      "디지털데일리",
      "디지털타임스",
      "블로터",
      "전자신문",
      "지디넷코리아",
      "더스쿠프",
    ],
  },
  {
    type: "매거진",
    list: [
      "레이디경향",
      "매경이코노미",
      "시사IN",
      "시사저널",
      "신동아",
      "월간 산",
      "이코노미스트",
      "주간경향",
      "주간동아",
      "주간조선",
      "중앙SUNDAY",
      "한겨레21",
      "한경비즈니스",
    ],
  },
  {
    type: "전문지",
    list: [
      "기자협회보",
      "농민신문",
      "뉴스타파",
      "동아사이언스",
      "여성신문",
      "일다",
      "코리아중앙데일리",
      "코리아헤럴드",
      "코메디닷컴",
      "헬스조선",
    ],
  },
  {
    type: "지역",
    list: [
      "강원도민일보",
      "광주일보",
      "경기일보",
      "국제신문",
      "대구MBC",
      "대전일보",
      "매일신문",
      "부산일보",
      "전주MBC",
      "CJB청주방송",
      "JIBS",
      "KBC광주방송",
    ],
  },
  {
    type: "포토",
    list: ["신화사", "연합뉴스 포토", "AP", "EPA"],
  },
];

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

  // 초기 상태는 빈 배열로 시작
  const [subscribedPublisher, setSubscribedPublisher] = useState([]);

  // initialCategories가 로드되면 selectedTopics 업데이트
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
        {publishers.map((publisher) => (
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

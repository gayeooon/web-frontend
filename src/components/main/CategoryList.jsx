import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

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

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const {
    data: categories = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.result.preferredCategories,
  });

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) return;
    setSelectedCategory(category);
  };

  const buttonClass = (category) => {
    return `flex-shrink-0 whitespace-nowrap font-bold text-sm py-2 px-4 rounded-full border-[1px] border-border ${
      selectedCategory === category
        ? "bg-my-purple text-white"
        : "bg-white text-black"
    }`;
  };

  // 로딩 상태 처리
  if (isPending) {
    return (
      <div className="flex gap-2 pl-6 w-full overflow-x-auto scrollbar-hide">
        <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return <div>카테고리를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="flex gap-2 pl-6 w-full overflow-x-auto scrollbar-hide">
      <button
        onClick={() => handleCategorySelect("allCategory")}
        className={buttonClass("allCategory")}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={buttonClass(category)}
        >
          {topics.find((topic) => topic.id === category).name}
        </button>
      ))}
    </div>
  );
}

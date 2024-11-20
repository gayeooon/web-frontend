import { TOPICS } from "@/lib/constants";
import { useUser } from "@/contexts/UserProvider";

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const { categories } = useUser();

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
          {TOPICS.find((topic) => topic.id === category).name}
        </button>
      ))}
    </div>
  );
}

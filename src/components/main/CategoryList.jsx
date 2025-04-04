import { CATEGORIES } from '@/lib/constants';
import useGetUserCategories from '@/hooks/queries/user/useGetUserCategories';

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const { data: userCategories, isLoading } = useGetUserCategories();

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) return;
    setSelectedCategory(category);
  };

  const buttonClass = (category) => {
    return `flex-shrink-0 whitespace-nowrap font-bold text-sm py-2 px-4 rounded-full border-[1px] border-border ${
      selectedCategory === category
        ? 'bg-my-purple text-white'
        : 'bg-white text-black'
    }`;
  };

  if (isLoading) return <></>;

  return (
    <div className="flex gap-2 pl-6 w-full overflow-x-auto scrollbar-hide">
      <button
        onClick={() => handleCategorySelect('allCategory')}
        className={buttonClass('allCategory')}
      >
        전체
      </button>
      {userCategories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={buttonClass(category)}
        >
          {CATEGORIES.find((topic) => topic.id === category).name}
        </button>
      ))}
    </div>
  );
}

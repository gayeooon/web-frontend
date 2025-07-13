import { useState } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { CATEGORIES, MIN_SELECTIONS } from '@/lib/constants';
import { SpinnerIcon } from '@/components/ui/custom/Loading';

const CategorySelect = ({
  userCategories,
  onSubmit,
  buttonText,
  isLoading,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(userCategories);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isSelected = (categoryId) => selectedCategories.includes(categoryId);

  return (
    <>
      {selectedCategories.length < MIN_SELECTIONS && (
        <h3 className="mb-4 text-xl font-bold underline underline-offset-8 decoration-1">
          {`최소 ${MIN_SELECTIONS}개 주제를 선택하세요.`}
        </h3>
      )}
      <div className="bg-white rounded-lg w-full text-center">
        <div className="flex flex-wrap gap-[3%] justify-center">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer rounded-2xl p-4 border-2 w-[31%] flex-shrink-0 mb-[3%] ${
                isSelected(category.id)
                  ? 'bg-background border-my-purple'
                  : 'bg-none border-border'
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <span className="text-4xl">{category.emoji}</span>
              <span className="block mt-2 text-sm font-bold break-keep">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        className="absolute bottom-0"
        onClick={() => onSubmit(selectedCategories)}
        disabled={selectedCategories.length < MIN_SELECTIONS || isLoading}
      >
        {isLoading ? <SpinnerIcon /> : buttonText}
      </Button>
    </>
  );
};

export default CategorySelect;

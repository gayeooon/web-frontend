import { useState } from "react";
import logo from "@/assets/서찬혁.png";

const categories = [
  "IT / 과학",
  "경제",
  "생활 / 문화",
  "카테고리1",
  "카테고리2",
  "카테고리3",
  "카테고리4",
  "카테고리5",
  "카테고리6",
];

export default function CategoryList() {
  const [selectedCategories, setSelectedCategories] = useState(["전체"]);

  const toggleCategory = (category) => {
    setSelectedCategories((prevSelected) => {
      let newSelected = [...prevSelected];
      if (category === "전체") {
        return ["전체"];
      } else {
        if (newSelected.includes(category)) {
          console.log(newSelected);
          newSelected = newSelected.filter((cat) => cat !== category);
          if (newSelected.length === 0) newSelected.push("전체");
        } else {
          newSelected.push(category);
          newSelected = newSelected.filter((cat) => cat !== "전체");
        }
      }
      return newSelected;
    });
  };

  const buttonClass = (category) => {
    return `flex-shrink-0 whitespace-nowrap font-bold text-sm py-2 px-4 rounded-full border-[1px] border-border ${
      selectedCategories.includes(category)
        ? "bg-my-purple text-white"
        : "bg-white text-black"
    }`;
  };

  return (
    <div className="flex gap-2 pl-6 w-full overflow-x-auto">
      <button
        onClick={() => toggleCategory("전체")}
        className={buttonClass("전체")}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={buttonClass(category)}
        >
          {category}
        </button>
      ))}
      <img src={logo} className="w-8" />
    </div>
  );
}

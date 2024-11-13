import searchIcon from "@/assets/search_input.svg";
import { useState } from "react";

export default function SearchInput({ setSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setSearch(inputValue.trim());
    setInputValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="mt-10 mx-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border-[1px] border-border w-full h-12 px-4 rounded-full">
          <input
            className="w-full focus:outline-none"
            placeholder="뉴스 제목 / 카테고리로 검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="hover:cursor-pointer" onClick={handleSearch}>
            <img src={searchIcon} alt="검색" />
          </div>
        </div>
      </form>
    </div>
  );
}

import searchIcon from "@/assets/search_input.svg";
import { useRef } from "react";

export default function SearchInput({ search, setSearch }) {
  const inputRef = useRef();
  console.log(inputRef.value);

  const onChangeSearch = (e) => {
    if (e.key === "Enter") setSearch(e.target.value);
  };
  return (
    <div className="mt-10 mx-6">
      <div className="flex items-center border-[1px] border-border w-full h-12 px-4 rounded-full">
        <input
          className="w-full focus:outline-none"
          placeholder="키워드 / 언론사 / 카테고리로 검색"
          onKeyDown={onChangeSearch}
          ref={inputRef}
        />
        <div
          className="hover:cursor-pointer"
          onClick={() => setSearch(inputRef.current.value)}
        >
          <img src={searchIcon} alt="검색" />
        </div>
      </div>
    </div>
  );
}

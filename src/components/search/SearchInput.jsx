import search from "@/assets/search_input.svg";

export default function SearchInput() {
  return (
    <div className="mt-10 mx-6">
      <div className="flex items-center border-[1px] border-border w-full h-12 px-4 rounded-full">
        <input
          className="w-full focus:outline-none"
          placeholder="키워드 / 언론사 / 카테고리로 검색"
        />
        <img src={search} alt="검색" />
      </div>
    </div>
  );
}

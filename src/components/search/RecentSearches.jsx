import deleteIcon from "@/assets/delete.svg";

const searches = [
  "검색어1",
  "검색어2",
  "검색어3",
  "검색어4",
  "검색어5",
  "검색어6",
  "검색어7",
];

export default function RecentSearches() {
  const buttonClass = (category) => {
    return `flex-shrink-0 whitespace-nowrap font-bold text-xs py-2 px-4 rounded-full border-[1px] border-border bg-white text-black`;
  };

  return (
    <div className="ml-6 mt-8">
      <div className="flex justify-between items-center mr-8 mb-4">
        <h3 className="text-lg font-bold">최근 검색어</h3>
        <button className="text-xs font-bold text-txt-placeholder">
          모두 지우기
        </button>
      </div>
      <div className="flex gap-2 w-full overflow-x-auto scrollbar-hide">
        {searches.map((category) => (
          <div key={category} className={buttonClass(category)}>
            {category}
            <button className="ml-3 w-2">
              <img className="w-full h-full" src={deleteIcon} alt="x" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import deleteIcon from "@/assets/delete.svg";
import { useState } from "react";

const initialSearches = [
  "검색어1",
  "검색어2",
  "검색어3",
  "검색어4",
  "검색어5",
  "검색어6",
  "검색어7",
];

export default function RecentSearches() {
  const [searches, setSearches] = useState(initialSearches);
  const buttonClass = `flex flex-shrink-0 whitespace-nowrap font-bold text-xs py-2 px-4 rounded-full border-[1px] border-border bg-white text-black`;

  const onClickDelete = (search) => {
    setSearches(searches.filter((it) => it !== search));
  };

  return (
    <div className="ml-6 mt-8">
      <div className="flex justify-between items-center mr-8 mb-4">
        <h3 className="text-lg font-bold">최근 검색어</h3>
        <button
          className="text-xs font-bold text-txt-placeholder"
          onClick={() => setSearches([])}
        >
          모두 지우기
        </button>
      </div>
      <div className="flex gap-2 w-full h-8 overflow-x-auto scrollbar-hide">
        {searches.length === 0 ? (
          <span className="text-sm font-bold text-black/40">
            최근 검색어가 없습니다.
          </span>
        ) : (
          searches.map((it) => (
            <div key={it} className={buttonClass}>
              {it}
              <div
                className="ml-3 w-2 hover:cursor-pointer"
                onClick={() => onClickDelete(it)}
              >
                <img className="w-full h-full" src={deleteIcon} alt="삭제" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

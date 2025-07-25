import { useEffect, useState } from 'react';
import IcDelete from '@/assets/IcDelete';

const MAX_HISTORY = 5;
const STORAGE_KEY = `search-history`;

export default function RecentSearches({ search, onClickRecents }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!search || typeof window === 'undefined') return;

    setHistory((prev) => {
      const filteredHistory = prev.filter((it) => it !== search);
      const newHistory = [search, ...filteredHistory].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, [search]);

  const updateLocalStorage = (newHistory) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const onClickDelete = (keyword) => {
    const newHistory = history.filter((it) => it !== keyword);
    updateLocalStorage(newHistory);
  };

  const onClickDeleteAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  return (
    <div className="ml-6 mt-6">
      <div className="flex justify-between items-center mr-8 mb-4">
        <h3 className="text-lg font-bold">최근 검색어</h3>
        <button
          className="text-xs font-bold text-txt-placeholder"
          onClick={onClickDeleteAll}
        >
          모두 지우기
        </button>
      </div>
      <div className="flex gap-2 w-full h-8 overflow-x-auto scrollbar-hide">
        {history.length === 0 ? (
          <span className="text-sm font-bold text-black/40">
            최근 검색어가 없습니다.
          </span>
        ) : (
          history.map((it) => (
            <div
              key={it}
              className="flex items-center flex-shrink-0 gap-3 whitespace-nowrap rounded-full border-[1px] border-border bg-white"
            >
              <div
                className="my-2 ml-4 font-bold text-xs hover:cursor-pointer"
                onClick={() => onClickRecents(it)}
              >
                {it}
              </div>
              <div
                className="my-2 mr-4 w-2 hover:cursor-pointer"
                onClick={() => onClickDelete(it)}
              >
                <IcDelete sm />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getArticles } from "@/lib/api";
import NewsItem from "./NewsItem";
import NewsDrawer from "./NewsDrawer";

const SIZE = 3;

export default function NewsList({ search = "", category = "전체" }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articleCursor, setArticleCursor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const processGetArticles = async () => {
    if (isLoading || isEnd) return;

    setIsLoading(true);
    try {
      const response = await getArticles({
        category: category === "전체" ? "allCategory" : category,
        articleCursor,
        size: SIZE,
      });
      const { result } = response;
      if (result) {
        if (result.length > 0) {
          setArticles((prev) => [...prev, ...result]);
          console.log(result[result.length - 1].articleId);
          setArticleCursor(result[result.length - 1].articleId);
        } else {
          setIsEnd(true);
        }
      }
    } catch (error) {
      console.log("Article error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setArticleCursor("");
    setIsEnd(false);
    processGetArticles();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 10) {
        processGetArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articleCursor, category]);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(null);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsOpen(true);
  };

  const getFilteredList = () => {
    let filtered = [...articles];
    if (search)
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(search.toLowerCase()) ||
          news.category.toLowerCase().includes(search.toLowerCase()) ||
          news.press.toLowerCase().includes(search.toLowerCase())
      );
    return filtered;
  };
  const filteredList = getFilteredList();

  return (
    <div className="w-full mb-2">
      <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
        {filteredList.length === 0 ? (
          <div className="my-8 font-bold text-txt-placeholder">{`'${
            search || category
          }'에 대한 검색결과가 없습니다.`}</div>
        ) : (
          filteredList.map((news, idx) => (
            <div key={idx} onClick={() => handleNewsClick(news)}>
              <NewsItem news={news} />
            </div>
          ))
        )}
      </div>
      <NewsDrawer
        isOpen={isOpen}
        selectedNews={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
}

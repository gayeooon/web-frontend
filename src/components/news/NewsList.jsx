import { useEffect, useRef, useState } from "react";
import { getArticleSearch, getArticles } from "@/lib/api";
import NewsListItem from "./NewsListItem";
import NewsDetail from "./NewsDetail";

const SIZE = 10;

export default function NewsList({ search = "", category = "allCategory" }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const nextCursorRef = useRef(-1);
  const isLoadingRef = useRef(false);

  const handleArticlesLoad = async () => {
    try {
      let response;
      if (search) {
        response = await getArticleSearch({
          keyword: search,
          size: SIZE,
        });
      } else
        response = await getArticles({
          category,
          size: SIZE,
        });

      const { result } = response;
      if (result.length < SIZE) nextCursorRef.current = -1;
      else nextCursorRef.current = result[SIZE - 1].articleId;
      setArticles(result);
    } catch (error) {
      console.log("Article error:", error);
    } finally {
    }
  };

  const handleLoadMore = async () => {
    if (nextCursorRef.current === -1) return;
    try {
      let response;
      if (search) {
        response = await getArticleSearch({
          keyword: search,
          articleCursor: nextCursorRef.current,
          size: SIZE,
        });
      } else
        response = await getArticles({
          category,
          articleCursor: nextCursorRef.current,
          size: SIZE,
        });

      const { result } = response;
      if (result.length < SIZE) nextCursorRef.current = -1;
      else nextCursorRef.current = result[SIZE - 1].articleId;
      setArticles((prev) => [...prev, ...result]);
    } catch (error) {
      console.log("Article error:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleArticlesLoad();

    const handleScroll = async () => {
      if (nextCursorRef < 0 || isLoadingRef.current) return;
      isLoadingRef.current = true;

      const maxScrollTop =
        document.documentElement.offsetHeight - window.innerHeight - 100;
      const currentScrollTop = document.documentElement.scrollTop;
      if (currentScrollTop >= maxScrollTop) {
        await handleLoadMore();
      }
      isLoadingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [category, search]);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(null);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news.articleId);
    setIsOpen(true);
  };

  return (
    <div className="w-full mb-2">
      <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
        {articles.length === 0 ? (
          <div className="my-8 mx-2 font-bold text-txt-placeholder">
            등록된 기사가 없습니다.
          </div>
        ) : (
          articles.map((news, idx) => (
            <div key={idx} onClick={() => handleNewsClick(news)}>
              <NewsListItem news={news} />
            </div>
          ))
        )}
      </div>
      <NewsDetail
        isOpen={isOpen}
        articleId={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
}

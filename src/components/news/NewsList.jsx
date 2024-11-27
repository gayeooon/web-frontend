import { useEffect, useRef, useState } from "react";
import NewsListItem from "./NewsListItem";
import NewsDetail from "./NewsDetail";
import useNewsQuery from "@/hooks/useNewsQuery";
import { NewsSkeleton } from "@/components/ui/custom/Loading";

export default function NewsList({ search = "", category = "allCategory" }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const isLoadingRef = useRef(false);

  const {
    articlesData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNewsQuery(category, search);

  useEffect(() => {
    if (!hasNextPage) return;
    const handleScroll = async () => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;

      const maxScrollTop =
        document.documentElement.offsetHeight - window.innerHeight - 100;
      const currentScrollTop = document.documentElement.scrollTop;
      if (currentScrollTop >= maxScrollTop) {
        fetchNextPage();
      }
      isLoadingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [category, search, hasNextPage]);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(null);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news.articleId);
    setIsOpen(true);
  };

  if (isPending)
    return (
      <div className="w-full mb-2">
        <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
          <NewsSkeleton />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="w-full mb-2">
        <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
          <span className="my-8 mx-2 font-bold text-txt-placeholder">
            일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </span>
        </div>
      </div>
    );
  const articlePages = articlesData?.pages ?? [];

  return (
    <div className="w-full mb-2">
      <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
        {articlePages.length === 0 ||
        articlePages[0].message === "No news found." ? (
          <span className="my-8 mx-2 font-bold text-txt-placeholder">
            등록된 기사가 없습니다.
          </span>
        ) : (
          articlePages.map((page) =>
            page.result.map((article) => (
              <div
                key={article.articleId}
                onClick={() => handleNewsClick(article)}
              >
                <NewsListItem news={article} />
              </div>
            ))
          )
        )}
        {isFetchingNextPage && <NewsSkeleton />}
      </div>
      <NewsDetail
        isOpen={isOpen}
        articleId={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
}

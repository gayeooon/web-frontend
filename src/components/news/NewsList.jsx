import { useEffect, useState } from 'react';
import NewsListItem from './NewsListItem';
import NewsDetail from './NewsDetail';
import useNewsQuery from '@/hooks/useGetArticles';
import { NewsSkeleton } from '@/components/ui/custom/Loading';

export default function NewsList({ type, keyword }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: articlesData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNewsQuery(type, keyword);

  console.log(articlesData);

  useEffect(() => {
    if (!hasNextPage) return;

    const handleScroll = async () => {
      const maxScrollTop =
        document.documentElement.offsetHeight - window.innerHeight - 100;
      const currentScrollTop = document.documentElement.scrollTop;
      if (currentScrollTop >= maxScrollTop) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [type, keyword, hasNextPage]);

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

  return (
    <div className="w-full mb-2">
      <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
        {articlesData.pages[0].result.length === 0 ? (
          <span className="my-8 mx-2 font-bold text-txt-placeholder">
            등록된 기사가 없습니다.
          </span>
        ) : (
          articlesData.pages.map((page) =>
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

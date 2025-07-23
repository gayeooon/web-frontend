import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/shadcn/carousel';
import { useEffect, useState } from 'react';
import NewsDetail from '@/components/news/NewsDetail';
import { formatDate } from '@/lib/utils';
import { CarouselSkeleton } from '../ui/custom/Loading';
import useGetCategoryNews from '@/hooks/queries/news/useGetCategoryNews';
import useNewsSelection from '@/hooks/useNewsSelection';
import Image from 'next/image';

export default function CategoryNewsCarousel({ category }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const { data: recentArticles, isPending } = useGetCategoryNews(category);
  const { selectedArticleId, isOpen, handleNewsClick, handleOpenChange } =
    useNewsSelection();

  useEffect(() => {
    if (!api) return;

    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (isPending) {
    return (
      <div className="mx-6 mb-6">
        <div className="text-[15px] font-bold mb-6 sm:text-[17px] ">
          <span className="text-my-green mr-2">{category}</span>
          <span>카테고리 최신 뉴스</span>
        </div>
        <div className="relative aspect-[363/128] min-h-[128px]">
          <CarouselSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-6 mb-6">
      <div className="text-[15px] font-bold mb-6 sm:text-[17px] ">
        <span className="text-my-green mr-2">{category}</span>
        <span>카테고리 최신 뉴스</span>
      </div>

      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full relative group"
        setApi={setApi}
      >
        <CarouselContent>
          {recentArticles.map((news, index) => (
            <CarouselItem key={index}>
              <div
                className="relative aspect-[363/128] min-h-[128px] overflow-hidden rounded-lg hover:cursor-pointer"
                onClick={() => {
                  handleNewsClick(news.articleId);
                }}
              >
                <Image
                  src={news.thumbnail}
                  alt={news.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 624px"
                />
                <div className="absolute inset-0 w-full bg-gradient-to-t from-black/60 to-black/10">
                  <div className="absolute flex flex-col h-full w-full justify-between p-4 sm:p-6">
                    <h2 className="font-bold text-white mb-2 text-[15px] sm:text-xl">
                      {news.title}
                    </h2>
                    <div className="flex w-full gap-3 items-center font-bold text-white text-xs sm:text-sm sm:gap-6">
                      <span>{news.press}</span>
                      <span className="text-lg">·</span>
                      <span>{formatDate(news.publishDate)}</span>
                    </div>
                    <div className="h-2"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 flex gap-4 justify-center h-2 w-full">
          {Array.from({ length: recentArticles.length }).map((_, idx) =>
            idx === current ? (
              <div
                key={idx}
                className="w-2 h-2 rounded-full bg-my-purple"
              ></div>
            ) : (
              <div key={idx} className="w-2 h-2 rounded-full bg-white"></div>
            )
          )}
        </div>
        <div className="absolute -left-0 top-1/2 -translate-y-1/2 transition-opacity duration-200 rounded-full opacity-0 md:group-hover:opacity-100">
          <CarouselPrevious className="relative left-0 shadow-md bg-white/80 hover:bg-white transition-colors duration-200" />
        </div>
        <div className="absolute -right-0 top-1/2 -translate-y-1/2 transition-opacity duration-200 rounded-full opacity-0 md:group-hover:opacity-100">
          <CarouselNext className="relative right-0 shadow-md bg-white/80 hover:bg-white transition-colors duration-200" />
        </div>
      </Carousel>
      <NewsDetail
        isOpen={isOpen}
        articleId={selectedArticleId}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
}

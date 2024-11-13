import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NewsDetail from "@/components/news/NewsDetail";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";
import { getHeadlines } from "@/lib/api";
import { formatDate } from "@/lib/utils";

const HeadlineNewsCarousel = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const {
    data: headlines = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["headlines"],
    queryFn: getHeadlines,
    select: (data) => data.result,
  });

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(null);
  };

  const handleNewsClick = (article) => {
    setSelectedNews(article.articleId);
    setIsOpen(true);
  };

  if (isPending) {
    return (
      <div className="w-full bg-background/30 rounded-lg border-[1px] border-background">
        <div className="m-6 aspect-[16/9] relative overflow-hidden rounded-lg hover:cursor-pointer">
          <div className="absolute inset-0 w-full animate-pulse bg-gray-200 "></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full group">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        opts={{
          loop: true,
        }}
        className="w-full bg-background/30 rounded-lg border-[1px] border-background"
      >
        <CarouselContent>
          {headlines.map((article, index) => (
            <CarouselItem key={index}>
              <div
                className="m-6 aspect-[16/9] relative overflow-hidden rounded-lg hover:cursor-pointer"
                onClick={() => {
                  handleNewsClick(article);
                }}
              >
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 w-full bg-gradient-to-t from-black/60 to-black/10"></div>
                <div className="absolute flex flex-col h-full w-full justify-between p-6">
                  <div className="flex flex-col h-full justify-center">
                    <h2 className="text-xl font-bold text-white mb-2 sm:text-2xl">
                      {article.title}
                    </h2>
                    <p className="text-white font-bold sm:text-lg">
                      {article.headLine}
                    </p>
                  </div>
                  <div className="flex w-full justify-between text-xs font-bold text-white sm:text-sm">
                    <span>{article.press}</span>
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-0 top-1/2 -translate-y-1/2 transition-opacity duration-200 rounded-full opacity-0 block group-hover:opacity-100">
          <CarouselPrevious className="relative left-0 shadow-md bg-white/80 hover:bg-white transition-colors duration-200" />
        </div>
        <div className="absolute -right-0 top-1/2 -translate-y-1/2 transition-opacity duration-200 rounded-full opacity-0 block group-hover:opacity-100">
          <CarouselNext className="relative right-0 shadow-md bg-white/80 hover:bg-white transition-colors duration-200" />
        </div>
      </Carousel>
      <NewsDetail
        isOpen={isOpen}
        articleId={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
};

export default HeadlineNewsCarousel;

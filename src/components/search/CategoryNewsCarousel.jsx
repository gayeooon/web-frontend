import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import favicon from "/favicon.png";
import NewsDrawer from "@/components/news/NewsDrawer";

const newsArray = [
  {
    title: `“최악의 기후재앙”…브라질 남부 폭우에 사망·실종 220명 넘어서`,
    content: "부상자 361명, 15만5천명 대피",
    publisher: "한겨래",
    date: "2024.10.15",
    image:
      "https://filmphotographyproject.com/wp-content/uploads/2024/06/Newspaper_HeroMod_770x_.jpg",
  },
  {
    title: "Tech Update",
    content: "New gadget released this week.",
    publisher: "한겨래",
    date: "2024.10.15",
    image: favicon,
  },
  {
    title: "Sports Highlight",
    content: "Amazing play in yesterday's game!",
    publisher: "한겨래",
    date: "2024.10.15",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Entertainment",
    content: "Celebrity announces new project.",
    publisher: "한겨래",
    date: "2024.10.15",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    date: "2024.10.15",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function CategoryNewsCarousel({ category }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(() => null);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(() => news);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!api) return;

    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

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
          {newsArray.map((news, index) => (
            <CarouselItem key={index}>
              <div
                className="relative aspect-[363/128] overflow-hidden rounded-lg hover:cursor-pointer"
                onClick={() => {
                  handleNewsClick(news);
                }}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 w-full bg-gradient-to-t from-black/60 to-black/10">
                  <div className="absolute flex flex-col h-full w-full justify-between p-6">
                    <h2 className="font-bold text-white mb-2 text-lg sm:text-xl">
                      {news.title}
                    </h2>
                    <div className="flex w-full gap-6 items-center font-bold text-white text-xs sm:text-sm">
                      <span>{news.publisher}</span>
                      <span className="text-lg">·</span>
                      <span>{news.date}</span>
                    </div>
                    <div className="h-2"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 flex gap-4 justify-center h-2 w-full">
          {Array.from({ length: newsArray.length }).map((_, idx) =>
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
      <NewsDrawer
        isOpen={isOpen}
        selectedNews={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // import 수정
import { useRef, useState } from "react";
import favicon from "@/assets/favicon.png";
import NewsDrawer from "./NewsDrawer";

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

const HeadlineNewsCarousel = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(null);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsOpen(true);
  };

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
          {newsArray.map((news, index) => (
            <CarouselItem key={index}>
              <div
                className="m-6 aspect-[16/9] relative overflow-hidden rounded-lg hover:cursor-pointer"
                onClick={() => {
                  handleNewsClick(news);
                }}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 w-full bg-gradient-to-t from-black/60 to-black/10"></div>
                <div className="absolute flex flex-col h-full w-full justify-between p-6">
                  <div className="flex flex-col h-full justify-center">
                    <h2 className="text-xl font-bold text-white mb-2 sm:text-2xl">
                      {news.title}
                    </h2>
                    <p className="text-white font-bold sm:text-lg">
                      {news.content}
                    </p>
                  </div>
                  <div className="flex w-full justify-between text-xs font-bold text-white sm:text-sm">
                    <span>{news.publisher}</span>
                    <span>{news.date}</span>
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
      <NewsDrawer
        isOpen={isOpen}
        selectedNews={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
};

export default HeadlineNewsCarousel;

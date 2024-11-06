import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import NewsDrawer from "@/components/news/NewsDrawer";
import favicon from "/favicon.png";

const newsArray = [
  {
    title: `“최악의 기후재앙”…브라질 남부 폭우에 사망·실종 220명 넘어서`,
    content: "기사 내용.",
    images: [
      "https://filmphotographyproject.com/wp-content/uploads/2024/06/Newspaper_HeroMod_770x_.jpg",
    ],
    press: "한겨래",
    category: "IT",
    comment: [
      {
        commentId: 1,
        content: "그러게 말입니다....",
        nickName: "김성진",
        createdDate: "2024-10-24T10:20:09.39933",
        isDeleted: true,
      },
      {
        commentId: 2,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-10-16T11:13:11.670474",
        isDeleted: false,
      },
      {
        commentId: 3,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-09-12T16:13:14.348445",
        isDeleted: false,
      },
      {
        commentId: 4,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-09-12T16:13:15.109507",
        isDeleted: false,
      },
      {
        commentId: 5,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-09-12T16:13:17.832021",
        isDeleted: false,
      },
      {
        commentId: 6,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-09-12T16:13:18.917908",
        isDeleted: false,
      },
      {
        commentId: 7,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-09-12T16:13:19.468132",
        isDeleted: false,
      },
      {
        commentId: 8,
        content: "텍스트",
        nickName: "김성진",
        createdDate: "2024-09-12T16:37:06.717686",
        isDeleted: false,
      },
    ],
    likeCount: 10,
    time: "3시간전",
  },
  {
    title:
      "'이게 되겠냐' 로제도 놀란 브루노 마스 협업...강남스타일 뛰어넘나 [Y녹취록]",
    content: "New gadget released this week.",
    images: [favicon],
    press: "한겨래",
    category: "IT",
    comment: [],
    likeCount: 0,
    time: "3시간전",
  },
  {
    title: "Sports Highlight",
    content: "Amazing play in yesterday's game!",
    images: [],
    press: "한겨래",
    category: "IT",
    comment: [],
    likeCount: 0,
    time: "3시간전",
  },
  {
    title: "기사 등록.",
    content: "기사 내용.",
    images: [],
    press: "JOONGANG",
    category: "IT",
    comment: [],
    likeCount: 0,
    time: "3시간전",
  },
  {
    title: "기사 등록.",
    content: "기사 내용.",
    images: [],
    press: "JOONGANG",
    category: "WORLD",
    comment: [],
    likeCount: 1,
    time: "3시간전",
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
                {news.images.length !== 0 && (
                  <img
                    src={news.images[0]}
                    alt={news.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

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

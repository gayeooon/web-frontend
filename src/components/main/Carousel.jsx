import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import favicon from "@/assets/favicon.png";

const newsArray = [
  {
    title: `“최악의 기후재앙”…브라질 남부 폭우에 사망·실종 220명 넘어서`,
    content: "부상자 361명, 15만5천명 대피",
    publisher: "한겨래",
    date: "2024.10.15",
    image: favicon,
  },
  {
    title: "Tech Update",
    content: "New gadget released this week.",
    publisher: "한겨래",
    date: "2024.10.15",
    image: "/placeholder.svg?height=400&width=600",
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

const NewsCarousel = () => {
  return (
    <div className="w-full max-w-2xl group mb-2">
      <Carousel className="w-full relative bg-background/30 rounded-lg border-2 border-background">
        <CarouselContent>
          {newsArray.map((news, index) => (
            <CarouselItem key={index}>
              <div className="p-6">
                <Card className="w-full">
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 w-full bg-gradient-to-t from-black/60 to-black/10">
                        <div className="absolute flex flex-col h-full w-full justify-between p-6">
                          <div className="flex flex-col h-full justify-center">
                            <h2 className="text-xl font-bold text-white mb-2">
                              {news.title}
                            </h2>
                            <p className="text-white font-bold">
                              {news.content}
                            </p>
                          </div>
                          <div className="flex w-full justify-between text-xs font-bold text-white">
                            <span>{news.publisher}</span>
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CarouselPrevious className="relative left-0" />
        </div>
        <div className="absolute -right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CarouselNext className="relative right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default NewsCarousel;

import { useState } from "react";
import favicon from "@/assets/favicon.png";
import NewsItem from "./NewsItem";
import NewsDrawer from "./NewsDrawer";

const newsArray = [
  {
    title: `“최악의 기후재앙”…브라질 남부 폭우에 사망·실종 220명 넘어서`,
    publisher: "한겨래",
    time: "3시간전",
    image:
      "https://filmphotographyproject.com/wp-content/uploads/2024/06/Newspaper_HeroMod_770x_.jpg",
  },
  {
    title: "Tech Update",
    content: "New gadget released this week.",
    publisher: "한겨래",
    time: "3시간전",
    image: favicon,
  },
  {
    title: "Sports Highlight",
    content: "Amazing play in yesterday's game!",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Entertainment",
    content: "Celebrity announces new project.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
  {
    title: "Science Discovery",
    content: "Researchers make breakthrough in quantum computing.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
  },
];

export default function NewsList() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setSelectedNews(null);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsOpen(true);
  };

  return (
    <div className="w-full mb-2">
      <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
        {newsArray.map((news, idx) => (
          <div key={idx} onClick={() => handleNewsClick(news)}>
            <NewsItem news={news} />
          </div>
        ))}
      </div>
      <NewsDrawer
        isOpen={isOpen}
        selectedNews={selectedNews}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
}

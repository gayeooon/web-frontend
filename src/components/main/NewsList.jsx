import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import favicon from "@/assets/favicon.png";
import ai from "@/assets/ai.svg";
import comment from "@/assets/comment.svg";
import like from "@/assets/like.svg";
import NewsItem from "./NewsItem";

const newsArray = [
  {
    title: `“최악의 기후재앙”…브라질 남부 폭우에 사망·실종 220명 넘어서`,
    publisher: "한겨래",
    time: "3시간전",
    image: favicon,
  },
  {
    title: "Tech Update",
    content: "New gadget released this week.",
    publisher: "한겨래",
    time: "3시간전",
    image: "",
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
];

export default function NewsList() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedButton, setSelectedButton] = useState("");

  const buttonClass =
    "bg-white flex gap-2 items-center font-bold py-2 px-3 rounded-full border-[1px]";

  return (
    <div className="w-full max-w-2xl  mb-2">
      <div className="flex flex-col w-full bg-background/30 rounded-lg border-[1px] px-4 border-background">
        {newsArray.map((news, idx) => (
          <div key={idx} onClick={() => setSelectedNews(news)}>
            <NewsItem news={news} />
          </div>
        ))}
      </div>
      <Drawer open={selectedNews !== null}>
        <DrawerContent className="bg-gradient-to-t from-white to-background">
          <div className="mx-auto px-6 w-full max-w-xl">
            <DrawerHeader>
              <DrawerTitle className="bg-white text-2xl font-bold my-4 p-4 rounded-lg border-[1px]">
                {selectedNews?.title}
              </DrawerTitle>
              <DrawerDescription>
                <div className="flex justify-between">
                  <button className={buttonClass}>
                    <img className="w-4" src={ai} />
                    AI 요약
                  </button>
                  <button className={buttonClass}>
                    <img className="w-4" src={comment} />
                    댓글
                  </button>
                  <button className={buttonClass}>
                    <img className="w-4" src={like} />
                    좋아요
                  </button>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>기사 링크로 이동</Button>
              <Button
                onClick={() => setSelectedNews(null)}
                className="bg-white text-black hover:bg-black/5"
              >
                닫기
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

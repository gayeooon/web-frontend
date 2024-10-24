import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NewsComment from "./NewsComment";
import ai_default from "@/assets/ai_default.svg";
import ai_white from "@/assets/ai_white.svg";
import comment_default from "@/assets/comment_default.svg";
import comment_white from "@/assets/comment_white.svg";
import like_default from "@/assets/like_default.svg";
import like_green from "@/assets/like_green.svg";

const AISummary =
  "보고서 제출 기한인 7월1일까지는 네이버가 소프트뱅크에 라인야후 지주사 지분 조정 협의가 마무리되기 힘들다는 판단에서다. 다만 보고서 제출 이후에는 민간 기업 자율 영역인만큼 네이버가 지분 매각을 택할 가능성도 배제할 수는 없다.";

export default function NewsDrawer({ isOpen, selectedNews, handleOpenChange }) {
  const [contentType, setContentType] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!selectedNews) {
      setIsLiked(false);
      return;
    }
    setLikeCount(selectedNews.likeCount);
  }, [selectedNews]);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContentChange = (type) => {
    if (type === contentType) setContentType("");
    else setContentType(type);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const setButtonClass = (type) => {
    return `flex gap-2 items-center font-bold py-2 px-3 rounded-full border-[1px] ${
      type === contentType ? "bg-my-green text-white" : "bg-white"
    }`;
  };

  const renderAISummary = (news) => {
    return (
      <div className="bg-white text-base text-black mt-4 p-4 rounded-lg border-[1px] border-my-green">
        {AISummary}
      </div>
    );
  };

  const renderDescription = () => (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            handleContentChange("ai");
          }}
          className={setButtonClass("ai")}
        >
          <img
            className="w-5"
            src={contentType === "ai" ? ai_white : ai_default}
          />
          AI 요약
        </button>
        <button
          onClick={() => {
            handleContentChange("comment");
          }}
          className={setButtonClass("comment")}
        >
          <img
            className="w-5"
            src={contentType === "comment" ? comment_white : comment_default}
          />
          댓글
        </button>
        <button onClick={toggleLike} className={setButtonClass()}>
          <img className="w-5" src={isLiked ? like_green : like_default} />
          {likeCount}
        </button>
      </div>
      <div>
        {contentType === "ai" ? (
          renderAISummary()
        ) : contentType === "comment" ? (
          <NewsComment comments={selectedNews?.comment ?? []} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent className="bg-gradient-to-t from-white to-background  md:max-w-sm lg:max-w-lg">
            <div className="h-full relative">
              <SheetHeader>
                <SheetTitle className="bg-white text-2xl font-bold my-4 p-4 rounded-lg border-[1px]">
                  {selectedNews?.title}
                </SheetTitle>
                <SheetDescription asChild>
                  {renderDescription()}
                </SheetDescription>
              </SheetHeader>
              <div className="absolute -bottom-3 flex flex-col mt-10 gap-2 w-full">
                <Button>기사 링크로 이동</Button>
                <SheetClose asChild>
                  <Button className="bg-white text-black hover:bg-black/5">
                    닫기
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-gradient-to-t from-white to-background w-full">
        <div className="mx-auto px-6 w-full max-w-xl max-h-[95vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="bg-white text-xl font-bold my-4 p-4 rounded-lg border-[1px] sm:text-2xl">
              {selectedNews?.title}
            </DrawerTitle>
            <DrawerDescription asChild>{renderDescription()}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>기사 링크로 이동</Button>
            <DrawerClose asChild>
              <Button className="bg-white text-black hover:bg-black/5">
                닫기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

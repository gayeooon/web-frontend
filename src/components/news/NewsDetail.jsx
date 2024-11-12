import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticle } from "@/lib/api";
import NewsDetailContent from "./NewsDetailContent";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/shadcn/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";
import { Button } from "@/components/ui/shadcn/button";

export default function NewsDetail({ isOpen, articleId, handleOpenChange }) {
  const [isDesktop, setIsDesktop] = useState(false);

  const {
    data: article = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticle(articleId),
    enabled: Boolean(articleId),
    select: (data) => data.result,
  });

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isError) {
    /**
     * @TODO
     * 에러 toast
     * isOpen=false 설정
     * articleId=null
     */

    return <></>;
  }

  if (isDesktop) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent className="bg-gradient-to-t from-white to-background  md:max-w-sm lg:max-w-lg">
            <div className="h-full relative">
              <SheetHeader>
                <SheetTitle className="bg-white text-2xl font-bold my-4 p-4 rounded-lg border-[1px]">
                  {isPending ? (
                    <div className="animate-pulse h-10 w-full bg-gray-200 rounded-full"></div>
                  ) : (
                    article.title
                  )}
                </SheetTitle>
                <SheetDescription asChild>
                  <div>
                    <NewsDetailContent
                      isPending={isPending}
                      article={article}
                      articleId={articleId}
                    />
                  </div>
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
              {article.title}
            </DrawerTitle>
            <DrawerDescription asChild>
              <div>
                <NewsDetailContent
                  isPending={isPending}
                  article={article}
                  articleId={articleId}
                />
              </div>
            </DrawerDescription>
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

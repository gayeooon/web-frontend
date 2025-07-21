import { useState, useEffect } from 'react';
import NewsDetailContent from './NewsDetailContent';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/shadcn/drawer';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/shadcn/sheet';
import { Button } from '@/components/ui/shadcn/button';
import useGetArticle from '@/hooks/queries/news/useGetArticle';

export default function NewsDetail({ isOpen, articleId, onOpenChange }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const { data: article, isPending, isError } = useGetArticle(articleId);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    window.open(article.articleSource);

    // 선호도 표시
    // axios.post(`/articles/${articleId}/rate`, {
    //   preference: 1,
    // });
  };

  if (isError) {
    return <></>;
  }

  if (isDesktop) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
                <Button onClick={handleLinkClick} disabled={isPending}>
                  기사 링크로 이동
                </Button>
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
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-gradient-to-t from-white to-background w-full">
        <div className="mx-auto px-6 w-full max-w-xl max-h-[95vh] max-h-[95dvh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="bg-white text-xl font-bold my-4 p-4 rounded-lg border-[1px] sm:text-2xl">
              {isPending ? (
                <div className="animate-pulse h-10 w-full bg-gray-200 rounded-full"></div>
              ) : (
                article.title
              )}
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
            <Button
              onClick={() => window.open(article.articleSource)}
              disabled={isPending}
            >
              기사 링크로 이동
            </Button>
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

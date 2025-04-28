import { useState } from 'react';
import { useToaster } from '@/contexts/ToasterProvider';
import axios from '@/lib/axios';
import { formatDate } from '@/lib/utils';
import { PageSpinner } from '@/components/ui/custom/Loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { EllipsisVertical, Ban, Share2 } from 'lucide-react';

export default function NewsListItem({ news }) {
  const toast = useToaster();
  const [isLoading, setIsLoading] = useState(false);

  const handleBanClick = (e) => {
    e.stopPropagation();
    toast('info', '관심 없음 처리되었습니다.');
    axios.post(`/articles/${news.articleId}/rate`, {
      preference: -1,
    });
  };

  const handleShareClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await axios.get(`/articles/${news.articleId}`);
      const url = res.result.articleSource;
      navigator.clipboard.writeText(url);
      toast('info', '기사 링크를 복사했습니다.');
    } catch {
      console.log(error);
      toast('error', '네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-32 gap-6 px-4 py-4 border-b border-border hover:cursor-pointer sm:min-h-36">
      {news.thumbnail && (
        <div className="w-1/4 h-24 min-w-24 sm:h-28">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={news.thumbnail}
            alt={news.title}
          />
        </div>
      )}
      <div className="flex flex-col justify-between py-2 w-3/4">
        <h2 className="font-bold line-clamp-2 text-[15px] sm:text-lg">
          {news.title}
        </h2>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-bold text-gray-600">{news.press}</span>
            <span className="mx-2">·</span>
            <span className="text-gray-400">
              {formatDate(news.publishDate)}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="px-2">
                <EllipsisVertical size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleBanClick}>
                <Ban />
                <span>관심 없음</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShareClick}>
                <Share2 />
                <span>공유</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isLoading && <PageSpinner />}
    </div>
  );
}

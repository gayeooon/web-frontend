import { useState } from 'react';
import usePostArticleLike from '@/hooks/queries/news/usePostArticleLike';
import useDeleteArticleLike from '@/hooks/queries/news/useDeleteArticleLike';
import NewsComment from './NewsComment';
import IcLike from '@/assets/IcLike';
import IcAI from '@/assets/IcAI';
import IcComment from '@/assets/IcComment';

const NewsDetailContent = ({ isPending, article, articleId }) => {
  const [contentType, setContentType] = useState('ai');
  const { mutate: addLike } = usePostArticleLike();
  const { mutate: deleteLike } = useDeleteArticleLike();

  const setButtonClass = (type) => {
    return `flex gap-2 items-center font-bold py-2 px-3 rounded-full border-[1px] ${
      type === contentType ? 'bg-my-green text-white' : 'bg-white'
    }`;
  };

  const handleContentChange = (type) => {
    if (type === contentType) setContentType('');
    else setContentType(type);
  };

  const toggleLike = () => {
    if (article.likedArticle) deleteLike(articleId);
    else addLike(articleId);
  };

  if (isPending) {
    return (
      <div className="flex justify-between">
        <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-full"></div>
        <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  const buttonItems = [
    {
      key: 'ai',
      label: 'AI 요약',
      icon: <IcAI active={contentType === 'ai'} />,
      onClick: () => handleContentChange('ai'),
      className: setButtonClass('ai'),
    },
    {
      key: 'comment',
      label: '댓글',
      icon: <IcComment active={contentType === 'comment'} />,
      onClick: () => handleContentChange('comment'),
      className: setButtonClass('comment'),
    },
    {
      key: 'like',
      label: article.likeCount ?? 0,
      icon: <IcLike active={article.likedArticle} />,
      onClick: toggleLike,
      className: setButtonClass(),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        {buttonItems.map((item) => (
          <button
            key={item.key}
            onClick={item.onClick}
            className={item.className}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
      <div>
        {contentType === 'ai' ? (
          <div className="bg-white text-base text-black mt-4 p-4 rounded-lg border-[1px] border-my-green">
            {article.content}
          </div>
        ) : contentType === 'comment' ? (
          <NewsComment commentList={article.comment} articleId={articleId} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NewsDetailContent;

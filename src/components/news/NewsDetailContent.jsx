import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, deleteLike } from "@/lib/api";
import NewsComment from "./NewsComment";
import ai_default from "@/assets/ai_default.svg";
import ai_white from "@/assets/ai_white.svg";
import comment_default from "@/assets/comment_default.svg";
import comment_white from "@/assets/comment_white.svg";
import like_default from "@/assets/like_default.svg";
import like_green from "@/assets/like_green.svg";

const NewsDetailContent = ({ isPending, article, articleId }) => {
  const [contentType, setContentType] = useState("ai");
  const queryClient = useQueryClient();

  useEffect(() => {
    setContentType("ai");
  }, [articleId]);

  const addLikeMutation = useMutation({
    mutationFn: () => addLike(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: () => deleteLike(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const toggleLike = () => {
    if (article.likedArticle) deleteLikeMutation.mutate();
    else addLikeMutation.mutate();
  };

  const handleContentChange = (type) => {
    if (type === contentType) setContentType("");
    else setContentType(type);
  };

  const setButtonClass = (type) => {
    return `flex gap-2 items-center font-bold py-2 px-3 rounded-full border-[1px] ${
      type === contentType ? "bg-my-green text-white" : "bg-white"
    }`;
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

  return (
    <>
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
          <img
            className="w-5"
            src={article.likedArticle ?? false ? like_green : like_default}
          />
          {article.likeCount ?? 0}
        </button>
      </div>
      <div>
        {contentType === "ai" ? (
          <div className="bg-white text-base text-black mt-4 p-4 rounded-lg border-[1px] border-my-green">
            {article.content}
          </div>
        ) : contentType === "comment" ? (
          <NewsComment commentList={article.comment} articleId={articleId} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NewsDetailContent;

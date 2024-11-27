import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "@/contexts/ToasterProvider";
import { formatDate } from "@/lib/utils";
import axios from "@/lib/axios";
import send from "@/assets/send.svg";
import deleteIcon from "@/assets/delete.svg";
import { SpinnerIcon } from "@/components/ui/custom/Loading";

export default function NewsComment({ commentList, articleId }) {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const toast = useToaster();

  const addCommentMutation = useMutation({
    mutationFn: (data) =>
      axios.post(`/articles/${articleId}/comments`, {
        comment: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      toast("info", "댓글이 등록되었습니다.");
    },
    onError: (error) => {
      console.error("Error:", error);
      toast("error", "네트워크 오류가 발생했습니다.");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) =>
      axios.delete(`/articles/${articleId}/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      toast("info", "댓글을 삭제했습니다.");
    },
    onError: (error) => {
      console.error("Error:", error);
      toast("error", "네트워크 오류가 발생했습니다.");
    },
  });

  const handleSendClick = () => {
    if (!comment.trim()) return;
    addCommentMutation.mutate(comment);
    setComment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendClick();
  };

  const formatCommentTime = (createdDate) => {
    let date = new Date(createdDate);
    date.setHours(date.getHours() + 9);
    return date.toISOString();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between w-full h-12 mt-4 rounded-full bg-background"
      >
        <input
          placeholder="댓글을 입력해 주세요"
          className="rounded-lg w-[80%] pl-4 bg-background text-black focus:outline-my-purple/50"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button
          className="flex justify-center items-center w-[20%] h-full rounded-[20px] bg-my-purple"
          onClick={handleSendClick}
          disabled={addCommentMutation.isPending}
        >
          {addCommentMutation.isPending ? (
            <SpinnerIcon />
          ) : (
            <img className="w-6" src={send} alt="send" />
          )}
        </button>
      </form>
      <div className="h-0 border-[0.5px] border-border my-6"></div>
      <div className="flex flex-col gap-2 max-h-[40vh] max-h-[40dvh] overflow-y-auto">
        {commentList.map((comment) => (
          <div
            key={comment.commentId}
            className="flex flex-col items-start gap-2 p-4 rounded-lg bg-white"
          >
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="mr-3 text-black font-bold">
                  {comment.nickName}
                </span>
                <span>
                  {formatDate(formatCommentTime(comment.createdDate))}
                </span>
              </div>
              {comment.isMyComment && (
                <button
                  onClick={() =>
                    deleteCommentMutation.mutate(comment.commentId)
                  }
                >
                  <img className="w-2.5 h-full" src={deleteIcon} alt="삭제" />
                </button>
              )}
            </div>
            <div className="text-black">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

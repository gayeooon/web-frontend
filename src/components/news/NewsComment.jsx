import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { SpinnerIcon } from '@/components/ui/custom/Loading';
import usePostComment from '@/hooks/queries/news/usePostComment';
import useDeleteComment from '@/hooks/queries/news/useDeleteComment';
import IcDelete from '@/assets/IcDelete';
import IcSend from '@/assets/IcSend';

export default function NewsComment({ commentList, articleId }) {
  const [comment, setComment] = useState('');

  const { mutate: addComment, isPending: isAddPending } =
    usePostComment(articleId);
  const { mutate: deleteComment } = useDeleteComment(articleId);

  const handleSendClick = () => {
    if (!comment.trim()) return;
    addComment({ articleId, comment });
    setComment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendClick();
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
          disabled={isAddPending}
        >
          {isAddPending ? <SpinnerIcon /> : <IcSend />}
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
                <span>{formatDate(comment.createdDate)}</span>
              </div>
              {comment.isMyComment && (
                <button
                  onClick={() =>
                    deleteComment({ articleId, commentId: comment.commentId })
                  }
                >
                  <IcDelete />
                </button>
              )}
            </div>
            <p className="text-black text-left">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

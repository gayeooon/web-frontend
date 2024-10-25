import { useState, useRef } from "react";
import send from "@/assets/send.svg";
import deleteIcon from "@/assets/delete.svg";

export default function NewsComment({ comments }) {
  const [commentList, setcommentList] = useState(comments);
  const inputRef = useRef();

  const setComment = (value) => {
    if (!value || value.trim() === "") return;

    const comment = {
      commentId: commentList.length + 1,
      content: value,
      nickName: "김성진",
      createdDate: new Date().toISOString(),
      isDeleted: true,
    };
    setcommentList((prev) => [comment, ...prev]);
    inputRef.current.value = "";
  };

  const onEnterKeyDown = (e) => {
    if (e.key === "Enter" && !e.repeat) {
      setComment(e.target.value);
      console.log("keydownevnet");
    }
  };

  const formatDate = (date) => {
    const today = new Date();
    const createdDate = new Date(date);

    const diffMs = today - createdDate;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return `${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`;
  };

  return (
    <div>
      <div className="flex justify-between w-full h-12 mt-4 rounded-full bg-background">
        <input
          placeholder="댓글을 입력해 주세요"
          className="rounded-lg w-[80%] pl-4 bg-background text-black focus:outline-my-purple/50"
          ref={inputRef}
        ></input>
        <button
          className="flex justify-center items-center w-[20%] h-full rounded-[20px] bg-my-purple"
          onClick={() => setComment(inputRef.current.value)}
        >
          <img className="w-6" src={send} alt="send" />
        </button>
      </div>
      <div className="h-0 border-[0.5px] border-border my-6"></div>
      <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
        {commentList.map((comment) => (
          <div
            key={comment.commentId}
            className="flex flex-col items-start gap-2 p-4 rounded-lg bg-white"
          >
            <div>
              <span className="mr-3 text-black font-bold">
                {comment.nickName}
              </span>
              <span>{formatDate(comment.createdDate)}</span>
            </div>
            <div className="text-black">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useRef } from "react";
import { formatDate } from "@/lib/utils";
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

  const onClickDelete = (commentId) => {
    console.log("click delete");
    setcommentList(commentList.filter((it) => it.commentId !== commentId));
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
            <div className="w-full flex justify-between items-center">
              <div>
                <span className="mr-3 text-black font-bold">
                  {comment.nickName}
                </span>
                <span>{formatDate(comment.createdDate)}</span>
              </div>
              {comment.isDeleted && (
                <button onClick={() => onClickDelete(comment.commentId)}>
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

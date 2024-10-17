import { useState } from "react";
import ai_default from "@/assets/ai_default.svg";
import ai_white from "@/assets/ai_white.svg";
import comment_default from "@/assets/comment_default.svg";
import comment_white from "@/assets/comment_white.svg";
import send from "@/assets/send.svg";
import like_default from "@/assets/like_default.svg";
import like_green from "@/assets/like_green.svg";

const AISummary =
  "보고서 제출 기한인 7월1일까지는 네이버가 소프트뱅크에 라인야후 지주사 지분 조정 협의가 마무리되기 힘들다는 판단에서다. 다만 보고서 제출 이후에는 민간 기업 자율 영역인만큼 네이버가 지분 매각을 택할 가능성도 배제할 수는 없다.";

const commentsArray = [
  {
    commentId: 1,
    content: "그러게 말입니다....",
    nickName: "김성진",
    createdDate: "2024-10-17T09:13:09.39933",
    isDeleted: true,
  },
  {
    commentId: 2,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-10-16T11:13:11.670474",
    isDeleted: false,
  },
  {
    commentId: 3,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-09-12T16:13:14.348445",
    isDeleted: false,
  },
  {
    commentId: 4,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-09-12T16:13:15.109507",
    isDeleted: false,
  },
  {
    commentId: 5,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-09-12T16:13:17.832021",
    isDeleted: false,
  },
  {
    commentId: 6,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-09-12T16:13:18.917908",
    isDeleted: false,
  },
  {
    commentId: 7,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-09-12T16:13:19.468132",
    isDeleted: false,
  },
  {
    commentId: 8,
    content: "텍스트",
    nickName: "김성진",
    createdDate: "2024-09-12T16:37:06.717686",
    isDeleted: false,
  },
];

export default function NewsDrawerContent() {
  const [contentType, setContentType] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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

  const formatDate = (date) => {
    const today = new Date();
    const createdDate = new Date(date);
    let diffTime = (today - createdDate) / (1000 * 60 * 60 * 24);
    if (diffTime < 1) return `${Math.ceil(diffTime * 24)}시간 전`;
    if (diffTime < 7) return `${Math.round(diffTime)}일 전`;
    return `${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`;
  };

  const renderComments = () => {
    return (
      <div>
        <div className="flex justify-between w-full h-12 mt-4 rounded-full bg-background">
          <input
            placeholder="댓글을 입력해 주세요"
            className="rounded-lg w-[80%] pl-4 bg-background text-black focus:outline-my-purple/50"
          ></input>
          <button className="flex justify-center items-center w-[20%] h-full rounded-[20px] bg-my-purple">
            <img className="w-6" src={send} alt="send" />
          </button>
        </div>
        <div className="h-0 border-[0.5px] border-border my-6"></div>
        <div className="flex flex-col gap-2 max-h-[35vh] overflow-y-auto">
          {commentsArray.map((comment) => (
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
  };

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
          <img className="w-5" src={isLiked ? like_green : like_default} />
          {likeCount}
        </button>
      </div>
      <div>
        {contentType === "ai" ? (
          renderAISummary()
        ) : contentType === "comment" ? (
          renderComments()
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

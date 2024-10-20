import send from "@/assets/send.svg";

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

export default function NewsComment() {
  const formatDate = (date) => {
    const today = new Date();
    const createdDate = new Date(date);
    let diffTime = (today - createdDate) / (1000 * 60 * 60 * 24);
    if (diffTime < 1) return `${Math.ceil(diffTime * 24)}시간 전`;
    if (diffTime < 7) return `${Math.round(diffTime)}일 전`;
    return `${createdDate.getMonth() + 1}월 ${createdDate.getDate()}일`;
  };

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
}

// Sign up
export const STEPS = {
  BASIC_INFO: 1,
  USER_DETAILS: 2,
  CATEGORY: 3,
  PUBLISHER: 4,
  COMPLETE: 5,
};

export const STEP_TITLES = {
  [STEPS.BASIC_INFO]: "뉴스핏이 처음인가요?\n기본 정보를 알려주세요.",
  [STEPS.USER_DETAILS]: "맞춤 뉴스 제공을 위한 추가 정보를 알려주세요.",
  [STEPS.CATEGORY]: "관심있는 뉴스 주제를 선택해주세요.",
  [STEPS.PUBLISHER]: "구독하고 싶은 언론사를 선택해주세요.",
};

// Categories
export const TOPICS = [
  { id: "정치", name: "정치", emoji: "🏛️" },
  { id: "경제", name: "경제", emoji: "💰" },
  { id: "사회", name: "사회", emoji: "👥" },
  { id: "생활_문화", name: "생활/문화", emoji: "🏠" },
  { id: "세계", name: "세계", emoji: "🌏" },
  { id: "기술_IT", name: "기술/IT", emoji: "💻" },
  { id: "연예", name: "연예", emoji: "🎤" },
  { id: "스포츠", name: "스포츠", emoji: "⚽" },
];

export const MIN_SELECTIONS = 3;

// Publishers
export const PUBLISHERS = [
  {
    type: "종합",
    list: [
      "경향신문",
      "국민일보",
      "동아일보",
      "문화일보",
      "서울신문",
      "세계일보",
      "조선일보",
      "중앙일보",
      "한겨레",
      "한국일보",
    ],
  },
  {
    type: "방송/통신",
    list: [
      "뉴스1",
      "뉴시스",
      "연합뉴스",
      "연합뉴스TV",
      "채널A",
      "한국경제TV",
      "JTBC",
      "KBS",
      "MBC",
      "MBN",
      "SBS",
      "SBS Biz",
      "TV조선",
      "YTN",
    ],
  },
  {
    type: "경제",
    list: [
      "매일경제",
      "머니투데이",
      "비즈워치",
      "서울경제",
      "아시아경제",
      "이데일리",
      "조선비즈",
      "조세일보",
      "파이낸셜뉴스",
      "한국경제",
      "헤럴드경제",
    ],
  },
  {
    type: "인터넷",
    list: [
      "노컷뉴스",
      "더팩트",
      "데일리안",
      "머니S",
      "미디어오늘",
      "아이뉴스24",
      "오마이뉴스",
      "프레시안",
      "디지털데일리",
      "디지털타임스",
      "블로터",
      "전자신문",
      "지디넷코리아",
      "더스쿠프",
    ],
  },
  {
    type: "IT",
    list: [
      "디지털데일리",
      "디지털타임스",
      "블로터",
      "전자신문",
      "지디넷코리아",
      "더스쿠프",
    ],
  },
  {
    type: "매거진",
    list: [
      "레이디경향",
      "매경이코노미",
      "시사IN",
      "시사저널",
      "신동아",
      "월간 산",
      "이코노미스트",
      "주간경향",
      "주간동아",
      "주간조선",
      "중앙SUNDAY",
      "한겨레21",
      "한경비즈니스",
    ],
  },
  {
    type: "전문지",
    list: [
      "기자협회보",
      "농민신문",
      "뉴스타파",
      "동아사이언스",
      "여성신문",
      "일다",
      "코리아중앙데일리",
      "코리아헤럴드",
      "코메디닷컴",
      "헬스조선",
    ],
  },
  {
    type: "지역",
    list: [
      "강원도민일보",
      "광주일보",
      "경기일보",
      "국제신문",
      "대구MBC",
      "대전일보",
      "매일신문",
      "부산일보",
      "전주MBC",
      "CJB청주방송",
      "JIBS",
      "KBC광주방송",
    ],
  },
  {
    type: "포토",
    list: ["신화사", "연합뉴스 포토", "AP", "EPA"],
  },
];

export const MIN_SUBSCRIPTIONS = 3;

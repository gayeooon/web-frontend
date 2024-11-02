const BASE_URL = "https://www.newsfit.shop";
const kakaoToken = import.meta.env.VITE_KAKAO_TOKEN;

export async function getMemberInfo() {
  const response = await fetch(`${BASE_URL}/member/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("유저 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function getPublishers() {
  const response = await fetch(`${BASE_URL}/member/press`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("언론사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/member/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("카테고리 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getArticles({
  category = "allCategory",
  size = 10,
  articleCursor = "",
}) {
  const query = `category=${category}&size=${size}&articleCursor=${articleCursor}`;
  console.log(`${BASE_URL}/articles?${query}`);
  const response = await fetch(`${BASE_URL}/articles?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("기사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

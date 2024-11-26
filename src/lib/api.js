const BASE_URL = "https://www.newsfit.shop";
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const kakaoToken = import.meta.env.VITE_KAKAO_TOKEN;

// 기사 관련 API
export async function getArticles({
  category = "allCategory",
  size = 10,
  articleCursor = "",
}) {
  const query = `category=${category}&size=${size}&articleCursor=${articleCursor}`;

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
  return body;
}

export async function getArticleSearch({
  keyword = "",
  size = 10,
  articleCursor = "",
}) {
  const query = `keyword=${keyword}&size=${size}&articleCursor=${articleCursor}`;
  const response = await fetch(`${BASE_URL}/articles/search?${query}`);
  if (!response.ok) {
    throw new Error("기사 검색 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

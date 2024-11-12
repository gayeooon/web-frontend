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

export async function getArticle(articleId) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`);
  if (!response.ok) {
    throw new Error("기사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function updateMemberInfo(newInfo) {
  console.log(JSON.stringify(newInfo));
  const response = await fetch(`${BASE_URL}/member/info`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    body: JSON.stringify(newInfo),
  });
  if (!response.ok) {
    throw new Error("유저 데이터를 업데이트 하는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function updatePublishers(newPublishers) {
  const response = await fetch(`${BASE_URL}/member/press`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    body: JSON.stringify({
      preferredPress: newPublishers,
    }),
  });

  if (!response.ok) {
    throw new Error("언론사 데이터를 업데이트 하는데 실패했습니다");
  }

  const body = await response.json();
  console.log(body);
  return body;
}

export async function updateCategories(newCategories) {
  const response = await fetch(`${BASE_URL}/member/categories`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    body: JSON.stringify({
      preferredCategories: newCategories,
    }),
  });

  if (!response.ok) {
    throw new Error("카테고리 데이터를 업데이트 하는데 실패했습니다");
  }

  const body = await response.json();
  console.log(body);
  return body;
}

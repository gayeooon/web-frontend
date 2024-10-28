const BASE_URL = "https://www.newsfit.shop";

export async function getMemberInfo() {
  const response = await fetch(`${BASE_URL}/member/info`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthbyBnYXllYW40MzBAa2FrYW8uY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mjk3NzQyOTgsImV4cCI6MTczODQxNDI5OH0.dvrfrnvhbW3wdfrpMs7eU5nlrKhT6C1xzXZy24LDRlk",
    },
  });
  if (!response.ok) {
    throw new Error("유저 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function getMemberPress() {
  const response = await fetch(`${BASE_URL}/member/press`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthbyBnYXllYW40MzBAa2FrYW8uY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mjk3NzQyOTgsImV4cCI6MTczODQxNDI5OH0.dvrfrnvhbW3wdfrpMs7eU5nlrKhT6C1xzXZy24LDRlk",
    },
  });
  if (!response.ok) {
    throw new Error("언론사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

export async function getMemberCategories() {
  const response = await fetch(`${BASE_URL}/member/categories`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthbyBnYXllYW40MzBAa2FrYW8uY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mjk3NzQyOTgsImV4cCI6MTczODQxNDI5OH0.dvrfrnvhbW3wdfrpMs7eU5nlrKhT6C1xzXZy24LDRlk",
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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthbyBnYXllYW40MzBAa2FrYW8uY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mjk3NzQyOTgsImV4cCI6MTczODQxNDI5OH0.dvrfrnvhbW3wdfrpMs7eU5nlrKhT6C1xzXZy24LDRlk",
    },
  });
  if (!response.ok) {
    throw new Error("기사 데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  console.log(body);
  return body;
}

import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.newsfit.shop",
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    try {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refreshToken");

      // refreshToken이 없는 경우
      if (!refreshToken) {
        window.location.replace("/login");
        return Promise.reject(error);
      }

      // 401 error일 때
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 토큰 재발급
        localStorage.removeItem("accessToken");
        const response = await axios.get(
          `${instance.defaults.baseURL}/member/reissue`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = response.data.result;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      }

      throw error;
    } catch (refreshError) {
      // 토큰 재발급 과정에서 에러가 발생한 경우

      return Promise.reject(refreshError);
    }
  }
);

export default instance;

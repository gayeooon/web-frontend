import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const getCategoryNews = async (category) => {
  const response = await instance.get(
    `/articles/search?keyword=${category}&size=5`
  );
  return response.result;
};

const useGetCategoryNews = (category) =>
  useQuery({
    queryKey: ['recentArticles', category],
    queryFn: () => getCategoryNews(category),
  });

export default useGetCategoryNews;

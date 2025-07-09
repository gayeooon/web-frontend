import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const getArticle = async (articleId) => {
  const response = await instance.get(`/articles/${articleId}`);
  return response.result;
};

const useGetArticle = (articleId) =>
  useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId),
    enabled: Boolean(articleId),
  });

export default useGetArticle;

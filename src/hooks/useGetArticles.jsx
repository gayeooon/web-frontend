import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const PAGE_SIZE = 10;

const getArticles = (pageParam, type, keyword) => {
  if (type === 'search')
    return instance.get(
      `/articles/search?keyword=${keyword}&page=${pageParam}&pageSize=${PAGE_SIZE}`
    );
  return instance.get(`/articles?page=${pageParam}&pageSize=${PAGE_SIZE}`);
};

const useGetArticles = (type, keyword) =>
  useInfiniteQuery({
    queryKey: [`${type}Articles`, keyword],
    queryFn: ({ pageParam }) => getArticles(pageParam, type, keyword),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : null,
  });

export default useGetArticles;

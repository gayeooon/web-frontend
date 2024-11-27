import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

const PAGE_SIZE = 10;

function useNewsQuery(category, search) {
  if (search) {
    const {
      data: articlesData,
      isPending,
      isError,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    } = useInfiniteQuery({
      queryKey: ["searchArticles", search],
      queryFn: ({ pageParam }) => {
        if (pageParam === -1)
          return axios.get(
            `/articles/search?keyword=${search}&size=${PAGE_SIZE}`
          );
        return axios.get(
          `/articles/search?keyword=${search}&size=${PAGE_SIZE}&articleCursor=${pageParam}`
        );
      },
      initialPageParam: -1,
      getNextPageParam: (lastPage) =>
        lastPage?.result.length < PAGE_SIZE
          ? null
          : lastPage.result[PAGE_SIZE - 1].articleId,
    });

    return {
      articlesData,
      isPending,
      isError,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    };
  }
  const {
    data: articlesData,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles", category],
    queryFn: ({ pageParam }) =>
      axios.get(
        `/articles/recommend?page=${pageParam}&category=${category}&pageSize=${PAGE_SIZE}`
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.hasMore ? lastPageParam + 1 : null,
  });

  return {
    articlesData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export default useNewsQuery;
